import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { User } from "./app/lib/types";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"


async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`select * from users where email = ${email}`
        console.log(user.rows[0].email)
        return user.rows[0];
        
    } catch (error) {
        console.log('failed to fetch user auth')
        throw new Error("Failed to fetch users");
        
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredential = z.
                    object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredential.success) {
                    const { email, password } = parsedCredential.data
                    const user = await getUser(email);
                    
                    if (!user) return null
                    console.log(user?.email)
                    const passwordMatch = await bcrypt.compare(password, user.password)
                    console.log(passwordMatch)
                    if(passwordMatch) {
                        console.log(passwordMatch)
                        return user
                    };

                }

                console.log('Invalid credentials')

                return null
            },

        }),
    ],
});