import "../core/styles/globals.css";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/core/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/core/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrains_Mono = JetBrains_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans min-h-screen",
          inter.variable,
          jetBrains_Mono.variable,
        )}
      >
        <Toaster richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main
            className={cn(
              "flex flex-col items-center", 
              "bg-white  text-black", 
              "dark:bg-black dark:text-white",
            )}
          >
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
