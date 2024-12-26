import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/types";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt"


async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`select * from users where email = ${email}`
        return user.rows[0];
    } catch (error) {
        throw new Error("Failed to fetch users");
        
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCrredential = z.
                    object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCrredential.success) {
                    const { email, password } = parsedCrredential.data
                    const user = await getUser(email);
                    if (!user) return null

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(passwordMatch) return user;
                }

                console.log('Invalid credentials')

                return null
            },

        })]
})