import { NextResponse } from "next/server.js";
import { User } from "../../db/models/all.js";
import { wait } from "@/app/utils/common.js";

export const maxDuration = 300;

export async function POST(request) {
    const data = await request.json();

    console.log(data.verification_data?.document);

    if (data.reference) {
        const profile = await User.findOne({
            where: {
                shuftipro_reference: data.reference,
            },
        });

        if (profile) {
            const updateData = {
                shuftipro_reference: data?.reference,
                kyc_status: data?.event,
            };

            if (data.event === "request.pending") {
                updateData.kyc_status = "pending";
            } else if (data.event === "verification.accepted") {
                await approveKYC(updateData, profile, data);
            } else if (data.event === "verification.status.changed") {
                if (profile.kyc_status !== "approved") {
                    const reference = data.reference;

                    const payload = await getKYCByReference(reference);

                    if (payload.event === "verification.accepted") {
                        console.log("KYC Approved manually", payload);

                        await approveKYC(updateData, profile, payload);
                    } else {
                        console.log("KYC Rejected manually", payload);

                        updateData.kyc_status = "rejected";
                    }
                }
            } else {
                updateData.kyc_status = "rejected";
            }

            profile.update(updateData);
        }
    }

    return NextResponse.json({
        status: 200,
    });
}

async function getKYCByReference(reference) {
    console.log("getting reference by KYC", reference);
    const payload = {
        reference: reference,
    };

    const token = btoa(
        `${process.env.SHUFTI_PRO_CLIENT_ID}:${process.env.SHUFTIPRO_SECRET}`
    );

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
        Accept: "application/json",
    };

    const response = await fetch(`https://api.shuftipro.com/status`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
}

async function approveKYC(updateData, profile, data) {
    updateData.kyc_status = "approved";
    updateData.gender = data.verification_data?.document?.gender;
    updateData.dob = data.verification_data?.document?.dob;
    updateData.country_code = data.verification_data?.document?.country;
    updateData.country_currency = data.info?.geolocation?.currency;
    updateData.address = data.verification_data?.address?.full_address;
    updateData.name =
        data.verification_data?.document?.name?.first_name +
        " " +
        data.verification_data?.document?.name?.middle_name +
        " " +
        data.verification_data?.document?.name?.last_name;

    profile.update(updateData);
}
