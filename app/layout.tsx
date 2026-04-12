import type { Metadata } from "next";
import "./globals.css";

const fontshareHref =
  "https://api.fontshare.com/v2/css?f[]=poppins@400,500,600&f[]=supreme@500,600&display=swap";
export const metadata: Metadata = {
  title: {
    default: "Carl Åberg",
    template: "Carl Åberg · Portfolio",
  },
  description:
    "User-centered Full-Stack Developer focused on accessible interfaces, resilient systems, and clear documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href={fontshareHref} rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
