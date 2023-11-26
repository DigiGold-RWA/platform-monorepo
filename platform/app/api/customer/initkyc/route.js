import { NextResponse } from "next/server.js";
import { User } from "../../db/models/all.js";
import { getToken } from "next-auth/jwt";

export async function POST(request) {
    const { email } = await getToken({ req: request });

    if (!email) {
        return NextResponse.json({
            status: 401,
            data: {
                message: "Unauthorized",
            },
        });
    }

    const profile = await User.findOne({
        where: {
            email,
        },
    });

    if (!profile) {
        return NextResponse.json({
            status: 401,
            data: {
                message: "Unauthorized",
            },
        });
    }

    let payload = {
        reference: `SP_REQUEST_${Math.random()}`,
        language: "EN",
        email: profile.email,
        redirect_url: process.env.SHUFTIPRO_REDIRECT_URL,
        callback_url: process.env.SHUFTIPRO_CALLBACK_URL,
        journey_id: process.env.SHUFTIPRO_JOURNEY_ID,
    };

    var token = btoa(
        `${process.env.SHUFTI_PRO_CLIENT_ID}:${process.env.SHUFTIPRO_SECRET}`
    );

    let data;

    if (profile.shuftipro_kyc_url && profile.shuftipro_reference) {
        data = {
            shuftipro_reference: profile.shuftipro_reference,
            verification_url: profile.shuftipro_kyc_url,
        };
    } else {
        const res = await fetch("https://api.shuftipro.com/", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Basic " + token, // if access token then replace "Basic" with "Bearer"
            },
            body: JSON.stringify(payload),
        });

        data = await res.json();

        await profile.update({
            shuftipro_reference: data.reference,
            shuftipro_kyc_url: data.verification_url,
        });
    }

    return NextResponse.json({
        status: 200,
        data,
    });
}
