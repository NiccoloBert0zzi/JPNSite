import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-base" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

import { currentTrip } from "@/data";

export const metadata = {
    title: `${currentTrip.title} | Planner`,
    description: `Itinerario di viaggio, budget e logistica per ${currentTrip.title}.`,
    icons: {
        icon: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${currentTrip.emoji}</text></svg>`
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="it" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable}`}>
                <ThemeRegistry>
                    <Navbar />
                    <main>{children}</main>
                </ThemeRegistry>
            </body>
        </html>
    );
}
