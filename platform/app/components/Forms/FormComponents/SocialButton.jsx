import React from "react";
import Image from "next/image";
// import { signIn } from "next-auth/react";

const SocialButton = ({ social, disabled }) => {
    const handleLogin = (e, social) => {
        e.preventDefault();
        // signIn(social, {
        //     callbackUrl: `${window.location.origin}/dashboard`,
        // });
    };

    return (
        <>
            <a
                onClick={function (e) {
                    handleLogin(e, social.name);
                }}
                className={
                    "h-12 w-12 p-2 bg-[#E0E0E0] rounded-full items-center justify-center flex " +
                    disabled
                }
            >
                <Image
                    src={social?.icon}
                    width={25}
                    height={25}
                    alt={social.name}
                />
            </a>
        </>
    );
};

export default SocialButton;
