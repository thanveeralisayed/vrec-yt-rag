import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db/db";
import * as schema from "@/db/schema";
import { serverEnv } from "@/data/serverEnv";

export const auth = betterAuth({
    appName: "yt-rag",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...schema,
        },
    }),
    advanced: {
        database: {
            generateId: "uuid"
        }
    },
    secret: serverEnv.BETTER_AUTH_SECRET,
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
    plugins: [
        nextCookies(),
    ],
});

export type Session = typeof auth.$Infer.Session;
