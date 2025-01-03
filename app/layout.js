import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";

const bebas = localFont({
  src: "./fonts/bebasneue.woff2",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-mainBg-ligther">
        <Header />
        {children}
      </body>
    </html>
  );
}
