// /netlify/edge-functions/ua-blocker.ts


// Centralized configuration
const CONFIG = {
    blockedRoutes: [
        // 2.x docs
        /^\/docs\/manual\//i,
        /^\/docs\/academy\/2\.x\//i,
        /^\/docs\/drivers\//i,
        /^\/docs\/typeql\//i,
        /^\/docs\/home\/2\.x\//i,
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

declare const Netlify: { env: { get(name: string): string | undefined } };

type TrafficPolicy = {
    ua?: string;
    missing?: string[];
    contains?: Record<string, string>;
    min?: number;
};

const trafficPolicy: TrafficPolicy | null = (() => {
    try {
        return JSON.parse(Netlify.env.get("EF_TRAFFIC_POLICY") ?? "null");
    } catch {
        return null;
    }
})();

const policySignals = (request: Request): string[] | null => {
    if (!trafficPolicy?.ua) return null;
    if (!(request.headers.get("user-agent") || "").includes(trafficPolicy.ua)) return null;
    const signals: string[] = [];
    for (const name of trafficPolicy.missing ?? []) {
        if (!request.headers.get(name)) signals.push(`-${name}`);
    }
    for (const [name, needle] of Object.entries(trafficPolicy.contains ?? {})) {
        if ((request.headers.get(name) || "").includes(needle)) signals.push(`+${name}`);
    }
    return signals.length >= (trafficPolicy.min ?? 1) ? signals : null;
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

    if (policySignals(request)) {
      console.log(
        `Blocked request ${request.method} ${path} (403, traffic policy); IP: ${clientIp}; Country: ${context?.geo?.country?.code ?? "-"}; UA: ${request.headers.get("user-agent")}`
      );
      return new Response("Forbidden", { status: 403 });
    }

    // Temporary traffic sampling (2026-07-14). Log selected fields only, never
    // the full header map.
    if (/^\/docs(\/home)?\/?$/i.test(path)) {
      console.log(`[docs-home-traffic] ${JSON.stringify({
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

    const llmUserAgentsRaw = "PetalBot,Factset_spyderbot,LinerBot,Timpibot,SemrushBot,AhrefsBot,AhrefsSiteAudit,AwarioBot,DotBot,MJ12Bot,GPTBot,ChatGPT-User,OAI-SearchBot,ClaudeBot,anthropic-ai,Google-Extended,PerplexityBot,Meta-ExternalAgent,CCBot,Bytespider,GrokBot,xAI-Grok,Grok-DeepSearch,Claude-SearchBot,Claude-User,Gemini-Deep-Research";

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
      return new Response("Forbidden", { status: 403 });
    }

    // Check against blocked UA patterns
    const matchedPattern = llmUserAgents.find((pattern) => pattern.test(ua));
    if (matchedPattern) {
      console.log(`Blocked request ${method} ${path} from ${ua} (matched: ${matchedPattern}); IP: ${ip}; Referer: ${referer}; Origin: ${origin}`);
      return new Response("Forbidden", { status: 403 });
    }

    // console.info(`Allowed request ${method} ${path} from ${ua} (matched: ${matchedPattern}); IP: ${ip}; Referer: ${referer}; Origin: ${origin}`);
    return; // proceed normally
  } catch (error) {
    console.error('Edge function error:', error);
    return; // Let request proceed if function fails
  }
};
