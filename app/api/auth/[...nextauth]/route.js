import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser._id.toString();

            return session;
        },

        async signIn({ profile }) {
            try {
                await connectToDB();

                const isUserExist = await User.findOne({
                    email: profile.email
                });

                if (!isUserExist) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    })
                }

                return new Response('Successfully Sign In: ', { status: 200 });
            } catch (error) {
                return new Response(`Sign In error: ${error}`, { status: 500 });
            }
        }
    },
})

export { handler as GET, handler as POST };