import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? ""
        })
    ],
    // We verified that the secret is in the .env file
    secret: process.env.NEXTAUTH_SECRET, 
    
    callbacks: {
        async signIn({ user, account }) {
            if (account && account.provider === "google") {
                try {
                    const response = await fetch("http://localhost:3001/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            Email: user.email,
                            name: user.name,
                            googleId: user.id
                        }),
                    });

                    if (!response.ok) {
                        return false;
                    }

                    const data = await response.json();
                    // We save the token that the backend returns in the user object
                    (user as any).backendAccessToken = data.access_token;
                    return true;
                } catch (error) {
                    console.error("Error logging in with backend:", error);
                    return false;
                }
            }
            return true;
        },

        async jwt({ token, account, user }) {
            // 1. Initial login
            if (account && user) {
                // We recover the token that we saved in signIn
                token.backendAccessToken = (user as any).backendAccessToken;
                
                // Optional: If the backend returns expiration, we would use it here.
                // For now, we assume a standard duration or decode it if necessary.
                token.backendAccessTokenExpires = Date.now() + 86400 * 1000; 
            }
            // Here we could maintain the renewal logic if your backend supports refresh tokens,
            // but for now we use the backend token as is.
            return token;
        },

        async session({ session, token }) {
            (session as any).backendAccessToken = token.backendAccessToken;
            return session;
        }
    },
    pages:{
        signIn: '/Login'
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };