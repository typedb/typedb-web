// /netlify/edge-functions/ua-blocker.ts


// Centralized configuration
const CONFIG = {
  blockedUserAgents: [
    /python-httpx/i,
    /PetalBot/i,
    /Factset_spyderbot/i,
    /LinerBot/i,
    /Timpibot/i,
    /SemrushBot/i,
    /AhrefsBot/i,
    /AhrefsSiteAudit/i,
    /AwarioBot/i,
    /DotBot/i,
    /MJ12Bot/i,
  ],
  exemptRoutes: [
    /^\/api\/.*$/i,
    /^\/ph\/.*$/i,
    /^\/platform\/.*$/i,
    /^\/forms\/.*$/i,
  ],
};

export default async (request: Request) => {
  try {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname;

    // Skip UA blocking for exempt routes
    if (CONFIG.exemptRoutes.some((pattern) => pattern.test(path))) {
      return; // proceed normally
    }

    const ua = request.headers.get("user-agent") || "";
    const url = request.url;
    const method = request.method;
    const ip = request.headers.get("x-nf-client-connection-ip") || "unknown";
    const referer = request.headers.get("referer") || "-";
    const origin = request.headers.get("origin") || "-";
    const acceptLang = request.headers.get("accept-language") || "-";

    // Block empty/null User-Agent
    if (!ua) {
      console.log(
        `Blocked request with empty/null User-Agent; IP: ${ip}; Referer: ${referer}; Origin: ${origin}`
      );
      return new Response("Forbidden", { status: 403 });
    }

    // Check against blocked UA patterns
    const matchedPattern = CONFIG.blockedUserAgents.find((pattern) => pattern.test(ua));
    if (matchedPattern) {
      console.log(
        `Blocked request ${method} ${url} from ${ua} (matched: ${matchedPattern}); IP: ${ip}; Referer: ${referer}; Origin: ${origin}; Accept-Language: ${acceptLang}`
      );
      return new Response("Forbidden", { status: 403 });
    }

    return; // proceed normally
  } catch (error) {
    console.error('Edge function error:', error);
    return; // Let request proceed if function fails
  }
};
