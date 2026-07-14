import type { Metadata } from "next";
import type { Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Premium type pairing for the marketing surface. Exposed as CSS variables and
// consumed ONLY by landing/marketing classes — app/admin keep Segoe UI via
// --font-family, so their appearance is unchanged.
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plugin AI — Intelligent RAG Platform",
  description: "Upload your documents, build AI workspaces, and deploy intelligent support assistants.",
  icons: {
    icon: [
      { url: '/PluginAi-Icon.png', type: 'image/png' },
    ],
    shortcut: '/PluginAi-Icon.png',
    apple: '/PluginAi-Icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
