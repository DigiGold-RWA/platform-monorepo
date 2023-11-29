"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRightIcon } from "./IconComponent";
import { LoaderIcon } from "./IconComponent";
import axios from "axios";
import { InfoCircle } from "iconsax-react";

export default function Notification({ user }) {
    const [loading, setLoading] = useState(false);

    console.log(user);

    const updateKycUrl = async () => {
        setLoading(true);

        if (user.shuftipro_url) {
            window.open(user.shuftipro_url, "_blank");
        } else {
            const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

            const response = await fetch(`${hostUrl}/api/customer/initkyc`, {
                method: "POST",
            });

            const res = await response.json();

            if (response.status === 200) {
                window.open(res.data?.verification_url, "_blank");
            }
        }

        setLoading(false);
    };

    return (
        <div>
            {user && user.kyc_status !== "approved" ? (
                <div className="bg-[#313130] border border-[#373737]  text-sm py-3 my-4 px-3 gap-3 rounded-lg  flex items-center justify-between ">
                    <div className=" flex items-center justify-start flex-1 gap-2">
                        <InfoCircle color="#FFFFFF" />{" "}
                        <p className="text-white inline-flex">
                            {user.kyc_status === "pending" &&
                                "Your KYC is in progress. This notification will be removed once your KYC is approved"}
                            {user.kyc_status === "rejected" &&
                                "Your KYC was rejected. Retry or contact support, for further action."}
                            {!user.kyc_status &&
                                "Kindly complete the KYC verification in order to gain full access to the DigiGold platform"}

                            {/* <Link
                                    href="#"
                                    target="_blank"
                                    className="ml-4 text-white font-semibold flex items-center gap-2"
                                >
                                    Learn more
                                    <span>
                                        <ArrowRightIcon />
                                    </span>
                                </Link> */}
                        </p>
                    </div>

                    {!user.kyc_status &&
                        (loading ? (
                            <LoaderIcon
                                extraClass={"text-[#FFCC29]"}
                                className="animate-spin mr-1"
                            />
                        ) : (
                            <button
                                className="text-[#FFCC29] underline font-bold text-sm"
                                onClick={updateKycUrl}
                            >
                                Complete KYC
                            </button>
                        ))}

                    {user.kyc_status === "pending" ? (
                        <LoaderIcon
                            extraClass={"text-[#FFCC29]"}
                            className="animate-spin mr-1"
                        />
                    ) : loading ? (
                        <LoaderIcon
                            extraClass={"text-[#FFCC29]"}
                            className="animate-spin mr-1"
                        />
                    ) : (
                        <button
                            className="text-[#FFCC29] underline font-bold text-sm"
                            onClick={updateKycUrl}
                        >
                            Complete KYC
                        </button>
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
