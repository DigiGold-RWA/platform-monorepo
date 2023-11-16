import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import AppleProvider from "next-auth/providers/apple";
import { User } from "../api/db/models/all.js";
import bcrypt from "bcrypt";
import SequelizeAdapter, { models } from "@auth/sequelize-adapter";
import connection from "../api/db/connection.js";

export const authConfig = {
    adapter: SequelizeAdapter(connection, {
        models: {
            // User: connection.define("users", {
            //     ...models.User,
            // }),
            // Account: connection.define("accounts", {
            //     ...models.Account,
            // }),
            // Session: connection.define("sessions", {
            //     ...models.Session,
            // }),
            // VerificationToken: connection.define("verification_tokens", {
            //     ...models.VerificationToken,
            // }),
        },
    }),
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_ID,
            clientSecret: {
                appleId: process.env.APPLE_ID,
                teamId: process.env.APPLE_TEAM_ID,
                privateKey: process.env.APPLE_PRIVATE_KEY,
                keyId: process.env.APPLE_KEY_ID,
            },
        }),
        CredentialsProvider({
            name: "Sign in with credentials",
            credentials: {
                username: {
                    label: "Email address",
                    type: "email",
                    placeholder: "",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password } = credentials;

                const exist = await User.scope("withPassword").findOne({
                    where: {
                        email,
                    },
                });

                if (!exist) return false;

                const passwordMatch = bcrypt.compareSync(
                    password,
                    exist.password
                );

                if (passwordMatch) {
                    return {
                        name: exist.name,
                        email: exist.email,
                        uuid: exist.uuid,
                    };
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/signup",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
