import { kycIsRequired } from "@/app/utils/common";

export default async function layout({ children }) {
    await kycIsRequired();

    return <>{children}</>;
}
