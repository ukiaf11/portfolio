import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Upendra Kumar Mahto | Full Stack Developer",
  description: "Portfolio of Upendra Kumar Mahto, Full Stack Developer at BOL7 Technologies, specializing in Django/Python backends and React frontends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              var savedTheme = localStorage.getItem('theme');
              if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
              } else {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
