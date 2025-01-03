import "./globals.css";
import Header from "@/components/Header";

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
