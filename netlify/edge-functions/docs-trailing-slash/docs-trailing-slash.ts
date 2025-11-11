import type { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Skip if: already ends with /, or it's a file (has extension)
  if (pathname.endsWith('/') || pathname.includes('.')) {
    return context.next();
  }

  // Redirect to slashed version (e.g., /docs/home/install → /docs/home/install/)
  const slashedPath = pathname + '/';
  const redirectUrl = new URL(slashedPath, url.origin);

  return Response.redirect(redirectUrl.toString(), 301);
};
