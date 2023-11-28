import { NextResponse } from "next/server.js";
import { User, Transaction } from "../../db/models/all.js";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const POST = withApiAuthRequired(async function myApiRoute(req) {
    const res = new NextResponse();
    const { user } = await getSession(req, res);
    const email = user?.email;

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

    if (!user) {
        return NextResponse.json({
            status: 404,
            data: {
                message: "Not Found",
            },
        });
    }

    const data = await req.json();

    const trx = await Transaction.create({
        user_id: profile.id,
        crypto: data?.crypto,
        type: data?.type,
        status: "completed",
        amount: data.amount,
        network_fee: data.network_fee,
        tx_id: data.tx_id,
        source_address: data.source_address,
        destination_address: data.destination_address,
        createdAt: new Date(),
    });

    return NextResponse.json({
        status: 200,
        data: trx,
    });
});

export async function GET(req) {
    const res = new NextResponse();
    const { user } = await getSession(req, res);
    const email = user?.email;

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
        include: {
            model: Transaction,
            as: "transactions",
            limit: 10,
            order: [["createdAt", "DESC"]],
        },
    });

    const transactions = await profile.transactions;

    return NextResponse.json({
        status: 200,
        data: transactions,
    });
}