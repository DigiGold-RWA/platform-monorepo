import { NextResponse } from "next/server.js";
import { User } from "../../db/models/all.js";

export async function POST(request) {
    const data = await request.json();

    if (data?.params?.user) {
        const { user } = data.params;

        const exist = await User.findOne({
            where: {
                email: user?.email,
            },
        });

        if (!exist) {
            await User.create({
                email: user?.email,
                email_verified: user?.email_verified,
                name: user?.name,
                phone: user?.phone_number,
                image: user?.picture,
            });
        }
    }

    return NextResponse.json({
        status: 200,
    });
}
