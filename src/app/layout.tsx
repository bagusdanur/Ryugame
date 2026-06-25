import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/i18n/LanguageContext";

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
    default: "RyuGame - Download Free Premium Android & PC Games",
    template: "%s | RyuGame"
  },
  description: "The best place to download Android (APK) & PC games, latest, free and premium, easily, quickly, and safely.",
  keywords: ["download games", "free games", "premium games", "android apk games", "pc games", "ryugame", "download pc games"],
  authors: [{ name: "RyuGame Team" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "RyuGame - Download Free Premium Android & PC Games",
    description: "The best place to download Android (APK) & PC games, latest, free and premium, easily, quickly, and safely.",
    url: "https://ryugame.web.id",
    siteName: "RyuGame",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RyuGame - Download Free Premium Android & PC Games",
    description: "The best place to download Android (APK) & PC games, latest, free and premium.",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="monetag" content="dfd1c42cbf4882b4e4cc05028aafae6e"></meta>
        {process.env.NODE_ENV === 'production' && (
          <script src="https://quge5.com/88/tag.min.js" data-zone="253091" async data-cfasync="false"></script>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('thumbnail-blur');
                  if (saved !== 'false') {
                    document.documentElement.classList.add('blur-thumbnails');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 relative`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {children}
          </main>
          <Footer />
        </LanguageProvider>

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


