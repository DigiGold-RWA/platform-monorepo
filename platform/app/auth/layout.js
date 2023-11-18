import { redirect } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
// import { authConfig } from "../lib/auth";

export default async function layout({ children }) {
    // const session = await getServerSession(authConfig);

    // if (session) return redirect("/dashboard");

    return (
        <>
            <div className=" min-h-screen py-0  sm:py-0 md:py-3 lg:py-6 bg-[#1b1b1b]">
                <div className="container mx-auto mt-0 lg:mt-7 mb-0 lg:mb-8 max-w-[800px] px-3 pb-7   ">
                    <div>
                        <div className="h-full pb-3">
                            <div className="flex justify-center items-center px-3 py-6  bx-shadow sm:px-6 md:px-8 lg:px-10 ">
                                
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
