/**
 * Utility function to wrap external links with Safelinku Quick Link format.
 */

const SAFELINKU_API_KEY = "a63723e7a96f226b218754bf624172dd1b28d5d2";
const SAFELINKU_BASE_URL = "https://sfl.gl/st/";

export function getSafelinkuUrl(destinationUrl: string): string {
  if (!destinationUrl) return "#";
  
  // Prevent wrapping internal links or already wrapped links
  if (destinationUrl.startsWith("/") || destinationUrl.includes("sfl.gl")) {
    return destinationUrl;
  }

  // Construct Safelinku API URL
  return `${SAFELINKU_BASE_URL}?api=${SAFELINKU_API_KEY}&url=${encodeURIComponent(destinationUrl)}`;
}
