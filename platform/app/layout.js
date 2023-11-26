import { SpaceFont } from "@/font";
import "./globals.css";
import { Providers } from "./Providers";

export const metadata = {
    title: "DigiGold: Fully Backed 1:1 Tokenized Gold",
    metadataBase: new URL("https://digigold.finance"),
    description:
        "Securely own as little as 1g(~$64) Tokenized Gold backed by 99.9% of pure Gold vaulted in Dubai without any associated risk.",
    keyword: [
        "Klaytn Gold",
        "Tokenization",
        "Tokenized Gold",
        "DigiGold",
        "Buy Gold",
        "DGOLD",
        "PAX Gold",
        "Gold Token",
        "Gold Tokenization",
        "Tether Gold",
    ],
    openGraph: {
        title: "Securely own as little as 1g(~$64) Tokenized Gold backed by 99.9% of pure Gold vaulted in Dubai without any associated risk.",
        description:
            "Securely own as little as 1g(~$64) Tokenized Gold backed by 99.9% of pure Gold vaulted in Dubai without any associated risk.",

        url: "https://digigold.finance",
        siteName: "DigiGold",
        images: [
            {
                url: "https://www.digigold.finance/images/gold-bars.png",
                width: 800,
                height: 600,
            },
            {
                url: "https://www.digigold.finance/images/gold-bars.png",
                width: 1800,
                height: 1600,
                alt: "Tokenized Gold",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    icons: {
        icon: [
            { url: "/images/favicon/favicon-16x16.png", size: "16x16" },
            { url: "/images/favicon/favicon-32x32.png", size: "32x32" },
        ],
        shortcut: "/images/favicon/favicon-32x32.png",
        apple: "/images/favicon/apple-touch-icon.png",
        andriod: [
            {
                url: "/images/favicon/android-chrome-192x192.png",
                size: "192x192",
            },
            {
                url: "/images/favicon/android-chrome-512x512.png",
                size: "512x512",
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${SpaceFont.variable} ${SpaceFont.className} `}
                suppressHydrationWarning={true}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
