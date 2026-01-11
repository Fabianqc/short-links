import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    // configure the providor with the client id and client secret
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? ""
        }), credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
                        Email: credentials?.email,
                        password: credentials?.password,
                    });
                    console.log(response);
                    return response.data;
                } catch (error) {
                    console.error("Error logging in:", error);
                    return null;
                }
            }
        })
    ],
    // We verified that the secret is in the .env file
    secret: process.env.NEXTAUTH_SECRET,
    // Configure the callbacks
    callbacks: {
        // Configure the sign in callback
        async signIn({ user, account }) {
            // If the user is signing in with google
            if (account && account.provider === "google") {
                try {
                    // We make a post request to the backend to log in
                    console.log(user);
                    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/login",
                        // We set the data for the login session with google
                        {
                            Email: user.email,
                            name: user.name,
                            googleId: user.id
                        }
                    );

                    // If the response is empty
                    if (!response.data) {
                        // We return false or not authenticated session
                        return false;
                    }

                    // We save the token that the backend returns in the user object
                    user.backendAccessToken = response.data.access_token;
                    // We return true or authenticated session
                    return true;
                } catch (error) {
                    console.error("Error logging in with backend:", error);
                    // We return false or not authenticated session
                    return false;
                }
            }
            // We return true or authenticated session
            return true;
        },

        async jwt({ token, account, user }) {
            // 1. Initial login
            if (account && user) {
                // We recover the token that we saved in signIn
                token.backendAccessToken = user.backendAccessToken;

                // Optional: If the backend returns expiration, we would use it here.
                // For now, we assume a standard duration or decode it if necessary.
                token.backendAccessTokenExpires = Date.now() + 86400 * 1000;
            }
            // Here we could maintain the renewal logic if your backend supports refresh tokens,
            // but for now we use the backend token as is.
            return token;
        },
        // Configure the session callback
        async session({ session, token }) {
            // Ensure user object exists
            if (!session.user) {
                session.user = {};
            }
            // We save the token that the backend returns in the session object
            session.user.backendAccessToken = token.backendAccessToken;
            return session;
        }
    },
    // Configure the pages in case of authentication
    pages: {
        signIn: '/Login'
    }
};
