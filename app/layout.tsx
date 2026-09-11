import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: "Copperhead Oil Field Services", template: "%s | Copperhead" },
  description: site.description,
  metadataBase: new URL("https://copperheadoil.com"),
  openGraph: { title: site.name, description: site.description, type: "website" },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Header/>{children}<Footer/></body></html>
}
