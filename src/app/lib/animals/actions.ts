'use server'
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { signIn } from "../../../../auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: 'Enter Name' }),
    age: z.coerce.number().gt(0, { message: 'Enter Age Greater than 0' })
})

const CreateAnimal = FormSchema.omit({ id: true })
const UpdateAnimal = FormSchema.omit({id: true})

export type AnimalState = {
    errors?: {
        name?: string[];
        age?: string[];
    };
    message?: string | null
}

export async function createAnimal(prevState: AnimalState, formData: FormData) {
    const validateFields = CreateAnimal.safeParse({
        name: formData.get('name'),
        age: formData.get('age')
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Database Error: Failed to create Animal'
        }
    }

    const { name, age } = validateFields.data

    try {
        await sql`insert into animals (name, age) values (${name}, ${age})`
    } catch (error) {
        return {
            message: 'Failed to create animal'
        }
    }
    revalidatePath('/animals')
    redirect('/animals')
}


export async function updateAnimal(id: string, prevState: AnimalState, formData: FormData) {
    const validateFields = UpdateAnimal.safeParse({
        name: formData.get('name'),
        age: formData.get('age')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Failed to update animal'
        }
    }

    const {name, age} = validateFields.data

    try {
        sql`update animals set name = ${name}, age = ${age} 
        where id == ${id}`
    } catch (error) {
        return {
            message: 'Failed to update animal'
        }
    }

    revalidatePath('/animals')
    redirect('/animals')
}

export async function deleteAnimal(id: string) {
    await sql`delete from animals where id == ${id}`
    revalidatePath('/animals')
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default: 
                    return 'Something went wrong';
            }
        }
        throw error
    }
}