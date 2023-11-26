import React from "react";
// import Sidebar from "../components/Sidebar";
import Navbar from "../components/DashboardNavbar";
import DashboardMobileMenu from "../components/MobileMenu/DashboardMobileMenu";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

export const metadata = {
    title: "Dashboard",
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

export default withPageAuthRequired(
    async function layout({ children }) {
        return (
            <>
                <div className="h-screen flex flex-row justify-start bg-[]">
                    <div className="flex-1 h-full overflow-y-auto">
                        <main className="main-wrapper">
                            <Navbar />

                            <div className=" container h-full py-2 lg:py-4 px-4 lg:px-4">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>

                <DashboardMobileMenu />
            </>
        );
    },
    { returnTo: "/dashboard" }
);
