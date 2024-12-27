import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                // Substitua esta lógica com a verificação de usuário real
                const user = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };

                if (credentials?.username === 'admin' && credentials?.password === 'admin') {
                    return user;
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});