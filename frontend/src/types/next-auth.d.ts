import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            backendAccessToken?: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        backendAccessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        backendAccessToken?: string;
    }
}
