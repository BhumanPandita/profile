import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Chatbot } from "@/components/chatbot";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhumanpandita.github.io"),
  title: "Bhuman Pandita | Portfolio",
  description: "Data Scientist & AI Engineer Portfolio",
  keywords: [
    "Bhuman Pandita",
    "Data Scientist",
    "AI Engineer",
    "Machine Learning",
    "Agentic AI",
    "Lab37",
    "IndiGo"
  ],
  authors: [{ name: "Bhuman Pandita", url: "https://bhumanpandita.github.io" }],
  openGraph: {
    title: "Bhuman Pandita | Portfolio",
    description: "Data Scientist & AI Engineer Portfolio",
    url: "https://bhumanpandita.github.io",
    siteName: "Bhuman Pandita",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/swot_analysis_real_1770478345192.png",
        width: 1200,
        height: 630,
        alt: "Bhuman Pandita | Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhuman Pandita | Portfolio",
    description: "Data Scientist & AI Engineer Portfolio",
    images: ["/swot_analysis_real_1770478345192.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
