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

// TEMPORARY (added 2026-07-14): once the abusive client is identified from the
// [docs-home-traffic] logs below, add its IP(s) here to block it at the edge.
const BLOCKED_IPS = new Set<string>([]);

export default async (request: Request, context?: { geo?: unknown }) => {
  try {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;

    const clientIp = request.headers.get("x-nf-client-connection-ip") || "unknown";

    if (BLOCKED_IPS.has(clientIp)) {
      return new Response("Too Many Requests", { status: 429 });
    }

    // TEMPORARY (added 2026-07-14): log traffic to the docs homepage to identify
    // the client reloading it thousands of times per minute.
    if (/^\/docs(\/home)?\/?$/i.test(path)) {
      console.log(`[docs-home-traffic] ${JSON.stringify({
        ip: clientIp,
        method: request.method,
        path,
        geo: context?.geo,
        headers: Object.fromEntries(request.headers.entries()),
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
