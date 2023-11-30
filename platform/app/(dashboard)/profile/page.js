import MainComponent from "@/app/components/PageLayout/MainComponent";
import { PageTitle } from "@/app/components/PageLayout/PageTitle";
import React from "react";
import { Calendar } from "iconsax-react";
import { EditIcon } from "@/app/components/IconComponent";
import Link from "next/link";
import { cookies } from "next/headers";

const Profile = async () => {
    const appSession = cookies().get("appSession")?.value;
    const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;
    const response = await fetch(`${hostUrl}/api/customer/profile`, {
        headers: {
            Cookie: `appSession=${appSession}`,
        },
    });

    let user = {};

    if (response.status === 200) {
        const res = await response.json();

        user = res.data;

        console.log("Got user: ", user);
    } else {
        console.log("No user found", response.statusText, response.status);
    }

    return (
        user && (
            <div>
                <div className="mb-6">
                    <PageTitle title={"Profile"} />
                </div>

                <MainComponent>
                    <div className="flex w-full py-5 px-3 gap-2 flex-wrap">
                        <div className="w-full lg:w-1/4 mb-4 md:mb-0">
                            <h1 className="text-white text-2xl font-bold">
                                {user?.name}
                            </h1>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="inline-flex items-center justify-start gap-2 text-sm mb-1 md:mb-3">
                                <h5 className="text-[#CDCDCD]">Account:</h5>
                                <p className="text-[#FFCC29] ">
                                    {user?.account_type}
                                </p>
                            </div>
                            <div className="flex items-start justify-between flex-wrap gap-3">
                                <div>
                                    <h5 className="text-[#CDCDCD] text-xs">
                                        Email address
                                    </h5>
                                    <p className="text-white text-sm font-medium">
                                        {user?.email}
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-[#737070] text-xs">
                                        Date of birth
                                    </h5>
                                    <p className="text-white text-sm font-medium inline-flex gap-2 items-center">
                                        {user?.dob}{" "}
                                        <span>
                                            <Calendar
                                                variant="Linear"
                                                size={20}
                                                color="#CDCDCD"
                                            />
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <h5 className="text-[#CDCDCD] text-xs">
                                        Address
                                    </h5>
                                    <p className="text-white text-sm font-medium inline-flex items-center gap-2">
                                        {user?.address}{" "}
                                        <span className="text-[#CDCDCD]">
                                            <EditIcon />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </MainComponent>

                <div className="text-white">
                    <h4 className="text-base font-semibold mb-4">
                        Personal Account Information
                    </h4>
                    <div className="space-y-3 text-sm text-[#D3D3D3]">
                        <p>
                            For the institutional name modification to be
                            approved, our staff needs official name change
                            documents.
                        </p>
                        <p>
                            Please send a{" "}
                            <Link
                                href="mailto:info@digigold.finance"
                                className="text-[#FFCC29]"
                            >
                                support ticket
                            </Link>{" "}
                            to update your account information.
                        </p>
                        <p>
                            These adjustments will not appear in your account
                            settings page due to system constraints; instead, a
                            team member will update your record.
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;
