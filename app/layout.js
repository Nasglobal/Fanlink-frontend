import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "sonner";
import AppProvider from "@/providers/AppStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "51 lex app",
  description: "Fan link application",
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
