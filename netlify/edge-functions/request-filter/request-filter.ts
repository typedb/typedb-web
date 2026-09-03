// /netlify/edge-functions/request-filter/request-filter.ts

// Netlify enforces rateLimit before this function is invoked
export const config = {
    path: "/*",
    rateLimit: {
        windowLimit: 300,
        windowSize: 60,
        aggregateBy: ["ip", "domain"],
    },
};

// Centralized configuration
const CONFIG = {
    blockedRoutes: [
        // 2.x blogs
        /^\/blog\/the-need-for-subtyping-and-polymorphism-in-databases/i,
        /^\/blog\/accelerating-drug-discovery-with-applied-knowledge-engineering-and-typedb/i,
        /^\/blog\/building-a-cyber-threat-intelligence-database-with-typedb/i,
        /^\/blog\/modeling-collections-in-databases-relational-sql-vs-typedb/i,
        /^\/blog\/the-age-of-ai-is-upon-us-where-are-the-smart-databases/i,
        /^\/blog\/inheritance-and-polymorphism-where-the-cracks-in-sql-begin-to-show/i,
        /^\/blog\/identity-and-access-management-with-typedb-part-iii-inference/i,
        /^\/blog\/identity-and-access-management-with-typedb-part-ii-transitivity/i,
        /^\/blog\/identity-and-access-management-with-typedb-part-i-polymorphism/i,
        /^\/blog\/what-is-a-knowledge-graph/i,
        /^\/blog\/inference-in-typedb/i,
    ],
};

// Served with 403s on blockedRoutes so that blocked agents relay accurate version framing
// instead of guessing.
const BLOCKED_ROUTE_MESSAGE = `This blog post covers TypeDB 2.x, which is end-of-life. It is intentionally withheld from search indexes and LLM training corpora to avoid confusion with TypeDB 3.x.

For current TypeDB 3.x documentation, see https://typedb.com/docs/home/ or the machine-readable https://typedb.com/docs/llms-full.txt
`;

const blockedRouteResponse = () =>
    new Response(BLOCKED_ROUTE_MESSAGE, {
        status: 403,
        headers: {
            "content-type": "text/plain; charset=utf-8",
            "x-robots-tag": "noindex",
        },
    });

declare const Netlify: { env: { get(name: string): string | undefined } };

type TrafficRule = {
    ua?: string;
    uaPattern?: string;
    countries?: string[];
    ipPrefixes?: string[];
    missing?: string[];
    contains?: Record<string, string>;
    min?: number;
};

const trafficPolicy: TrafficRule[] = (() => {
    try {
        const parsed = JSON.parse(Netlify.env.get("EF_TRAFFIC_POLICY") ?? "null");
        if (!parsed) return [];
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return [];
    }
})();

const uaPatterns = trafficPolicy.map((rule) => {
    try {
        return rule.uaPattern ? new RegExp(rule.uaPattern, "i") : null;
    } catch {
        return null;
    }
});

const ipv4ToInt = (ip: string): number | null => {
    const parts = ip.split(".");
    if (parts.length !== 4) return null;
    let result = 0;
    for (const part of parts) {
        const n = Number(part);
        if (!Number.isInteger(n) || n < 0 || n > 255) return null;
        result = result * 256 + n;
    }
    return result;
};

const ipMatches = (ip: string, prefixes: string[]): boolean =>
    prefixes.some((prefix) => {
        const [base, bits] = prefix.split("/");
        if (bits === undefined) return ip.startsWith(prefix);
        const ipInt = ipv4ToInt(ip);
        const baseInt = ipv4ToInt(base);
        const maskBits = Number(bits);
        if (ipInt === null || baseInt === null || !Number.isInteger(maskBits) || maskBits < 0 || maskBits > 32) return false;
        const mask = maskBits === 0 ? 0 : (~0 << (32 - maskBits)) >>> 0;
        return ((ipInt & mask) >>> 0) === ((baseInt & mask) >>> 0);
    });

const ruleSignals = (rule: TrafficRule, uaPattern: RegExp | null, request: Request, ip: string, country: string): string[] | null => {
    const hasGates = !!(rule.ua || rule.uaPattern || rule.countries?.length || rule.ipPrefixes?.length);
    const hasSignalChecks = !!(rule.missing?.length || Object.keys(rule.contains ?? {}).length);
    if (!hasGates && !hasSignalChecks) return null;
    const ua = request.headers.get("user-agent") || "";
    if (rule.ua && !ua.includes(rule.ua)) return null;
    if (rule.uaPattern && !uaPattern?.test(ua)) return null;
    if (rule.countries?.length && !rule.countries.includes(country)) return null;
    if (rule.ipPrefixes?.length && !ipMatches(ip, rule.ipPrefixes)) return null;
    const signals: string[] = [];
    for (const name of rule.missing ?? []) {
        if (!request.headers.get(name)) signals.push(`-${name}`);
    }
    for (const [name, needle] of Object.entries(rule.contains ?? {})) {
        if ((request.headers.get(name) || "").includes(needle)) signals.push(`+${name}`);
    }
    return signals.length >= (rule.min ?? (hasSignalChecks ? 1 : 0)) ? signals : null;
};

const policySignals = (request: Request, ip: string, country: string): string[] | null => {
    for (let i = 0; i < trafficPolicy.length; i++) {
        const signals = ruleSignals(trafficPolicy[i], uaPatterns[i], request, ip, country);
        if (signals) return [`rule:${i}`, ...signals];
    }
    return null;
};

export default async (
  request: Request,
  context?: { geo?: { country?: { code?: string } }; ip?: string },
) => {
  try {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;

    const clientIp = context?.ip
      || request.headers.get("x-nf-client-connection-ip")
      || (request.headers.get("x-forwarded-for") || "").split(",")[0].trim()
      || "unknown";

    const country = context?.geo?.country?.code ?? "-";
    const signals = policySignals(request, clientIp, country);
    if (signals) {
      // Block logging temporarily disabled (2026-09-03): filters catch ~78% of an
      // ongoing attack and the log volume drowns out traffic samples. Re-enable after.
      // console.log(
      //   `Blocked request ${request.method} ${path} (403, traffic policy ${signals.join(",")}); IP: ${clientIp}; Country: ${country}; UA: ${request.headers.get("user-agent")}`
      // );
      return new Response("Forbidden", { status: 403 });
    }

    // Temporary traffic sampling (2026-07-14)
    if (/^\/(docs(\/home)?\/?$|blog(\/|$))/i.test(path)) {
      console.log(`[traffic-sample] ${JSON.stringify({
        path,
        ip: clientIp,
        method: request.method,
        country: context?.geo?.country?.code,
        ua: request.headers.get("user-agent"),
        acceptLanguage: request.headers.get("accept-language"),
        referer: request.headers.get("referer"),
        secChUa: request.headers.get("sec-ch-ua"),
        secFetchSite: request.headers.get("sec-fetch-site"),
      })}`);
    }

    // Training crawlers and search-index fetchers only. User-action fetchers (Claude-User, ChatGPT-User)
    // are deliberately absent: they retrieve pages on behalf of a live user and are not used for training.
    const llmUserAgentsRaw = "PetalBot,Factset_spyderbot,LinerBot,Timpibot,SemrushBot,AhrefsBot,AhrefsSiteAudit,AwarioBot,DotBot,MJ12Bot,GPTBot,OAI-SearchBot,ClaudeBot,anthropic-ai,Google-Extended,PerplexityBot,Meta-ExternalAgent,CCBot,Bytespider,GrokBot,xAI-Grok,Grok-DeepSearch,Claude-SearchBot,Gemini-Deep-Research";

    const llmUserAgents = llmUserAgentsRaw
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((s) => new RegExp(s, "i")); // case-insensitive

    if (CONFIG.blockedRoutes.every((pattern) => !pattern.test(path))) {
      return;
    }

    const ua = request.headers.get("user-agent") || "";
    const method = request.method;
    const ip = clientIp;
    const referer = request.headers.get("referer") || "-";
    const origin = request.headers.get("origin") || "-";

    // Block empty/null User-Agent
    if (!ua) {
      console.log(
        `Blocked request with empty/null User-Agent; IP: ${ip}; Referer: ${referer}; Origin: ${origin}`
      );
      return blockedRouteResponse();
    }

    // Check against blocked UA patterns
    const matchedPattern = llmUserAgents.find((pattern) => pattern.test(ua));
    if (matchedPattern) {
      console.log(`Blocked request ${method} ${path} from ${ua} (matched: ${matchedPattern}); IP: ${ip}; Referer: ${referer}; Origin: ${origin}`);
      return blockedRouteResponse();
    }

    // console.info(`Allowed request ${method} ${path} from ${ua} (matched: ${matchedPattern}); IP: ${ip}; Referer: ${referer}; Origin: ${origin}`);
    return; // proceed normally
  } catch (error) {
    console.error('Edge function error:', error);
    return; // Let request proceed if function fails
  }
};
