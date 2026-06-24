import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RyuGame - Download Game Android & PC Premium Gratis",
    template: "%s | RyuGame"
  },
  description: "Tempat download game Android (APK) & PC terbaik, terbaru, gratis dan premium dengan mudah, cepat, dan aman.",
  keywords: ["download game", "game gratis", "game premium", "game android apk", "game pc", "ryugame", "download game pc"],
  authors: [{ name: "RyuGame Team" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "RyuGame - Download Game Android & PC Premium Gratis",
    description: "Tempat download game Android (APK) & PC terbaik, terbaru, gratis dan premium dengan mudah, cepat, dan aman.",
    url: "https://ryugame.web.id",
    siteName: "RyuGame",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RyuGame - Download Game Android & PC Premium Gratis",
    description: "Tempat download game Android (APK) & PC terbaik, terbaru, gratis dan premium.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <meta name="monetag" content="dfd1c42cbf4882b4e4cc05028aafae6e"></meta>
        <script src="https://quge5.com/88/tag.min.js" data-zone="253091" async data-cfasync="false"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 relative`}
      >
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </main>

        <footer className="border-t border-border/50 py-8 mt-12 bg-card/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RyuGame. Dibuat dengan cinta untuk para gamer.</p>
          </div>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registered with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}


