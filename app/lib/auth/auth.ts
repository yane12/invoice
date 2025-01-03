import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { sql } from "@vercel/postgres";
import { z } from "zod";
import type { User } from "../users/types";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<User | undefined> {
    try {
        const data = await sql<User>`select * from users where email ${email}`;
        return data.rows[0]
    } catch (error) {
        throw new Error("Failed to fetch user");
        
    }
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: []
})