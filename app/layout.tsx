import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#03050c" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://my-presentation-nine.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "My Presentations | Interactive Web Slide Decks",
    template: "%s | My Presentations",
  },
  description:
    "Personal presentation hub featuring 'Why Is the Night Sky Dark?' (Olbers' Paradox) and interactive slide decks.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "My Presentations | Interactive Web Slide Decks",
    description:
      "Personal presentation hub featuring 'Why Is the Night Sky Dark?' (Olbers' Paradox) and interactive slide decks.",
    siteName: "My Presentations",
    images: [
      {
        url: "/images/og-hub.png",
        width: 1200,
        height: 630,
        alt: "My Presentations | Interactive Web Slide Decks",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Presentations | Interactive Web Slide Decks",
    description:
      "Personal presentation hub featuring 'Why Is the Night Sky Dark?' (Olbers' Paradox) and interactive slide decks.",
    images: ["/images/og-hub.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('my-presentation-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(d?'dark':'light');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#03050c] dark:text-slate-100 selection:bg-sky-500/25 selection:text-sky-900 dark:selection:bg-cyan-500/30 dark:selection:text-cyan-200 overflow-x-hidden transition-colors duration-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
