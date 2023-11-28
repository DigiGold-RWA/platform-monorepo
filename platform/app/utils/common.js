import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";

export const wait = (ms) => new Promise((rs) => setTimeout(rs, ms));

export async function kycIsRequired() {
    const hostUrl = process.env.HOST_URL;

    const appSession = cookies().get("appSession")?.value;
    const response = await fetch(`${hostUrl}/api/customer/profile`, {
        headers: {
            Cookie: `appSession=${appSession}`,
        },
    });

    if (response.status === 200) {
        const res = await response.json();

        if (res.data?.kyc_status !== "approved") {
            return redirect("/dashboard");
        }
    } else {
        return redirect("/dashboard");
    }
}
