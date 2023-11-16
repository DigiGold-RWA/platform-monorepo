import React from "react";
import Sidebar from "../components/Sidebar";
// import DashboardMobileMenu from "../components/MobileMenu/DashboardMobileMenu";
import Navbar from "../components/Navbar";

export default async function layout({ children }) {

    return (
        <>
            <div className="h-screen flex flex-row justify-start bg-[]">
                <div className="flex-1 h-full overflow-y-auto">
                    <main className="main-wrapper">
                        <Navbar />

                        <div className=" container h-full py-2 lg:py-4 px-4 lg:px-0">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            {/* <DashboardMobileMenu /> */}
        </>
    );
}
