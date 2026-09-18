// Cloudflare Pages Middleware — Global request interceptor
// Handles canonical redirects (www -> non-www, http -> https)

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();

  // 1. Canonical redirect: www.taxzentic.com -> taxzentic.com (301 Permanent Redirect)
  if (hostname === 'www.taxzentic.com') {
    url.hostname = 'taxzentic.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // 2. Canonical protocol: enforce https for apex domain
  if (url.protocol === 'http:' && hostname === 'taxzentic.com') {
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
