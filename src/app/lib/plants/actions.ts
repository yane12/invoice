'use server';
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, {message: 'please enter name'}),
    color: z.string().trim().min(1, {message: 'please enter color'})
})

const CreateSchema = FormSchema.omit({id: true})

export type PlantState = {
    errors?: {
        name?: string[];
        color?: string[];
    };
    message?: string | null
} 

export async function createPlant(prevState: PlantState, formData: FormData) {
    const validateFields = CreateSchema.safeParse({
        name: formData.get('name'),
        color: formData.get('color')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Database Error: Failed to create Plant'
        }
    }

    const {name, color} = validateFields.data

    try {
        await sql`insert into plants(name, color) values (${name}, ${color})`;
    } catch (error) {
        return {
            message: 'Database Error: Failed to create plant'
        }
    }

    revalidatePath('/plants')
    redirect('/plants')
}