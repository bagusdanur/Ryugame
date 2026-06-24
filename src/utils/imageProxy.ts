export function getProxyUrl(url: string | undefined | null): string {
  if (!url) return "/placeholder.jpg";
  
  // If it's already a relative path, data URI, or local/subdomain, don't proxy
  if (
    url.startsWith("/") || 
    url.startsWith("data:") || 
    url.includes("ryugamezone.net") || 
    url.includes("ryukomik.web.id") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  
  return `/api/proxy-image?url=${encodeURIComponent(url)}`;
}
