import "./globals.css";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { FilterProvider } from "@/context/FilterContext";

const bebas = localFont({
  src: "./fonts/bebasneue.woff2",
  variable: "--font-bebas", // Optional CSS variable for the Bebas font
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppinsLight.woff2", weight: "300", style: "normal" },
    { path: "./fonts/poppinsRegular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppinsMedium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppinsSemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppinsBold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins", // Optional CSS variable for the Poppins font
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-mainBg-ligther ${poppins.variable}`}>
        <FilterProvider>
          <Header />
          {children}
        </FilterProvider>
      </body>
    </html>
  );
}
