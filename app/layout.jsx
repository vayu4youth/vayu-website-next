import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    metadataBase: new URL("https://vayuinternational.org"),
    title: "VAYU – Vedic Association for Youth Unity",
    description: "An APSA initiative reconnecting Hindu youth with their cultural and spiritual heritage.",
    icons: {
        icon: "/logos/VAYU_logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit:ital@0;1&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
                rel="stylesheet"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
                rel="stylesheet"
            />
        </head>
        <body>
        <Navbar />
        <main className="pt-20">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}