import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-base" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
    title: "Giappone 2026 | Itinerario",
    description: "Itinerario di viaggio, budget e logistica per il Giappone.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="it" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable}`}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
