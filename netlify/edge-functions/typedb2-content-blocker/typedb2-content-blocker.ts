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

export default async (request: Request) => {
  try {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;

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
    const ip = request.headers.get("x-nf-client-connection-ip") || "unknown";
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
