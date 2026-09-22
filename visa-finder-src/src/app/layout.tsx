import type { Metadata } from "next";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

export const metadata: Metadata = {
  title: "Japan Visa Finder",
  description: "Find your path to Japan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <QuizProvider>{children}</QuizProvider>
      </body>
    </html>
  );
}
