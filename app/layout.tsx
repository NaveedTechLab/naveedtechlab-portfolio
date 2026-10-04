import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Muhammad Naveed | AI Agent Engineer & Full Stack Developer",
  description:
    "Portfolio of Muhammad Naveed – Forward-Deployed AI Automation Engineer & Full Stack Developer building and operating production Slack/Google automation systems for a U.S. enterprise client. Based in Karachi, Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}
