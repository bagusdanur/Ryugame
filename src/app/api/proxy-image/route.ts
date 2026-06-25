import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  try {
    // Create an HTTPS Agent that ignores expired or invalid SSL certificates
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 8000, // Increase timeout to 8 seconds to give slow servers more time
      httpsAgent,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": new URL(imageUrl).origin,
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
      },
    });

    const contentType = String(response.headers["content-type"] || "image/jpeg");

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Proxy image error for URL:", imageUrl, (error as Error).message || error);
    // If proxy fails, redirect to the original URL so the browser can try direct loading
    return NextResponse.redirect(imageUrl, 302);
  }
}
