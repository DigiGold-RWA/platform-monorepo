"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowRightIcon } from "./IconComponent";
import { LoaderIcon } from "./IconComponent";
import axios from "axios";
import { InfoCircle } from "iconsax-react";

export default function Notification() {
    const user = {};
    const [loading, setLoading] = useState(false);

    const updateKycUrl = async () => {
        setLoading(true);

        if (user.shuftipro_url) {
            window.open(user.shuftipro_url, "_blank");
        } else {
            const hostUrl = process.env.NEXT_PUBLIC_AUTH_URL;

            const response = await axios.post(
                `${hostUrl}/api/customer/initkyc`,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                window.open(response.data?.data?.verification_url, "_blank");
            }
        }

        setLoading(false);
    };

    return (
        <div>
            {user.kyc_status !== "approved" ? (
                <div className="bg-[#313130] border border-[#373737]  text-sm py-3 my-4 px-3 gap-3 rounded-lg  flex items-center justify-between ">
                    <div className=" flex items-center justify-start flex-1 gap-2">
                        <InfoCircle color="#FFFFFF" />{" "}
                        {user.kyc_status === "pending" ? (
                            <p className="text-white inline-flex">
                                Your KYC is in progress. This notification will
                                be removed once your KYC is approved
                                <Link
                                    href="#"
                                    target="_blank"
                                    className="ml-4 text-white font-semibold flex items-center gap-2"
                                >
                                    Learn more
                                    <span>
                                        <ArrowRightIcon />
                                    </span>
                                </Link>
                            </p>
                        ) : (
                            <p className="text-white inline-flex">
                                Kindly complete the KYC verification in order to
                                gain full access to the DigiGold platform
                                {/* <Link
                                    href="#"
                                    target="_blank"
                                    className="ml-1 font-semibold flex items-center gap-2"
                                >
                                    Learn more
                                    <span>
                                        <ArrowRightIcon />
                                    </span>
                                </Link> */}
                            </p>
                        )}
                    </div>

                    {user.kyc_status !== "pending" &&
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
                </div>
            ) : (
                ""
            )}
        </div>
    );
}
