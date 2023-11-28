import { NextResponse } from "next/server.js";
import { User } from "../../db/models/all.js";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const GET = withApiAuthRequired(async function myApiRoute(req) {
    const res = new NextResponse();
    const { user, idToken, accessToken } = await getSession(req, res);

    const email = user?.email;

    if (!email) {
        return NextResponse.json({
            status: 401,
            data: {
                message: "Unauthorized",
            },
        });
    }

    return NextResponse.json({
        status: 200,
        data: idToken,
    });
});
