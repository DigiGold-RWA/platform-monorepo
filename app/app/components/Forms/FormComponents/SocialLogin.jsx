import React, { useState } from "react";
import SocialButton from "./SocialButton";

const SocialLogin = () => {
    const socials = [
        {
            name: "google",
            icon: "/images/socialIcons/google.svg",
        },
        {
            name: "apple",
            icon: "/images/socialIcons/apple.svg",
        },
        {
            name: "facebook",
            icon: "/images/socialIcons/facebook.svg",
        },
        {
            name: "twitter",
            icon: "/images/socialIcons/twitter.svg",
        },
        {
            name: "discord",
            icon: "/images/socialIcons/discord.svg",
        },
        {
            name: "linkedin",
            icon: "/images/socialIcons/linkedin.svg",
        },
    ];

    return (
        <>
            {socials.map((social, index) => (
                <SocialButton
                    disabled={
                        social.name !== "google"
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                    }
                    social={social}
                    key={index}
                ></SocialButton>
            ))}
        </>
    );
};

export default SocialLogin;
