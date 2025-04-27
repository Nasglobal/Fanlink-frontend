import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "@/providers/AppStateProvider";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = "https://fanlink.51lexapps.com"

export const metadata = {
  metadataBase: new URL(`${siteUrl}`),
  title: "51Lex Fanlink: Fanlink for music tracks",
  description:
    "All music track links embedded into a single link",
  canonical: "/",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title:
      "51Lex Fanlink: Fanlink for music tracks",
    description:
      "All music track links embedded into a single link",
    url: `${siteUrl}`,
    siteName: "51Lex fanlink",
    images: "/opengraph-image.png",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
        {children}
        <Toaster position="top-center" richColors />
        </AppProvider>
        </body>
       
    </html>
  );
}
