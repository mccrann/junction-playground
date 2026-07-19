import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junction Playground – Wearable Health Data Explorer",
  description:
    "Explore normalized wearable health data (steps, sleep, heart rate, body composition) via the Junction API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900 font-sans">
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-4">
            <span className="text-2xl">⌚</span>
            <div>
              <h1 className="text-xl font-bold leading-tight">
                Junction Playground
              </h1>
              <p className="text-xs text-gray-500">
                Normalized wearable health data explorer
              </p>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        <footer className="mt-16 border-t border-gray-200 py-6 text-center text-xs text-gray-400">
          Powered by the{" "}
          <a
            href="https://junction.health"
            className="underline hover:text-gray-600"
            target="_blank"
            rel="noreferrer"
          >
            Junction API
          </a>
        </footer>
      </body>
    </html>
  );
}
