import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"; // 👈 Importante

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET ?? ""
        })
    ],
    // Asegúrate de que esta variable esté en tu .env local del frontend
    secret: process.env.NEXTAUTH_SECRET, 
    
    callbacks: {
        async jwt({ token, account, user }) {
            // Solo en el momento del login
            if (account && user) {
                // 👇 AQUÍ CREAMOS EL TOKEN PARA NESTJS
                const tokenParaBackend = jwt.sign(
                    {
                        sub: user.id, // El ID del usuario
                        email: user.email,
                        name: user.name
                    },
                    process.env.NEXTAUTH_SECRET!, // Usamos la misma clave del .env
                    { expiresIn: '1d' } 
                );

                // Guardamos ese token nuevo dentro del objeto token de NextAuth
                token.backendAccessToken = tokenParaBackend;
            }
            return token;
        },

        async session({ session, token }) {
            // 👇 Pasamos el token a la sesión para que el cliente lo pueda leer
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