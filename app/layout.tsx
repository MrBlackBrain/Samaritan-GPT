import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import localFont from "next/font/local";

// Font files can be colocated inside of `pages`
const magdacleanmono = localFont({
  src: "../public/font/magdacleanmono-bold.ttf",
});

export const metadata = {
  title: "Samaritan GPT",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={magdacleanmono.className}>{children}</body>
    </html>
  );
}
