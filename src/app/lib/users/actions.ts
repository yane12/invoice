'use server'
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt'

const FormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, {message: 'Enter user name'}),
    email: z.string().email(),
    password: z.string().trim().min(6, {message: 'Enter Password'})
})

const CreateUser = FormSchema.omit({id: true})

export type UserState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null; 
}

export async function createUser(prevState: UserState, formData: FormData) {
    const validateFields = CreateUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })

    if(!validateFields.data) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Failed to create user'
        }
    }

    const {name, email, password} = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)


    try {
        await sql`insert into users (name, email, password) values
        (${name}, ${email}, ${hashedPassword})`
    } catch (error) {
        return {
            message: 'failed to create user'
        }
    }

    
}