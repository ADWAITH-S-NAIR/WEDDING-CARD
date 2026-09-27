import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arjun & Priya – Wedding Invitation",
  description:
    "You are warmly invited to celebrate the wedding of Arjun & Priya. Join us for a day full of love, joy, and beautiful memories.",
  keywords: ["wedding", "invitation", "RSVP", "celebration"],
  openGraph: {
    title: "Arjun & Priya – Wedding Invitation",
    description: "Join us to celebrate our special day ❤️",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${playfair.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="bg-dark-romantic min-h-dvh antialiased">{children}</body>
    </html>
  );
}
