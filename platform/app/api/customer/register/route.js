import { NextResponse } from "next/server.js";
import { User } from "../../db/models/all.js";

export async function POST(request) {
    const data = await request.json();

    console.log("New User", data);

    // const exist = await User.findOne({
    //     where: {
    //         email,
    //     },
    // });

    // if (exist) {
    //     return NextResponse.json({
    //         status: 400,
    //         data: {
    //             message: "User already exists",
    //         },
    //     });
    // } else {
    //     await User.create({
    //         email: email,
    //         password: hash,
    //     });
    // }

    return NextResponse.json({
        status: 200,
    });
}
