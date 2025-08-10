import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageShell from "@/components/common/PageShell";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Briya AIRE",
  description: "AI research environment",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, "min-h-screen bg-background font-sans antialiased")}
        >
        <header role="banner" className="sticky top-0 z-40 border-b bg-background">
          <PageShell>
            <div className="flex h-14 items-center justify-between">
              <Link href="/" className="font-semibold" aria-label="Briya AIRE home">
                Briya AIRE
              </Link>
              <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
                <Link href="/" className="hover:underline underline-offset-4">
                  Chat
                </Link>
                <Link href="/settings" className="hover:underline underline-offset-4">
                  Settings
                </Link>
              </nav>
            </div>
          </PageShell>
        </header>
        <main id="main" role="main" className="py-8">
          <PageShell>{children}</PageShell>
        </main>
        <footer role="contentinfo" className="border-t py-6 text-center text-xs text-muted-foreground">
          <PageShell>
            <p>&copy; {new Date().getFullYear()} Briya AIRE</p>
          </PageShell>
        </footer>
      </body>
    </html>
  );
}
