'use server'
import { z } from "zod"
import { sql } from "@vercel/postgres"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const CustomerFormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, {message: 'please enter name'}),
    email: z.string().trim().min(1, {message: 'please enter email'}),
    imageUrl: z.string().trim().min(1, {message: 'please enter image Url'}),
})

const CreateCustomer = CustomerFormSchema.omit({id: true})

export type CustomerState = {
    errors?: {
        name?: string[];
        email?: string[];
        imageUrl?: string[];
    };
    message?: string | null
}

export async function createCustomer(prevState: CustomerState, formData: FormData) {
    const validateFields = CreateCustomer.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        imageUrl: formData.get('image_url')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'failed to create customer'
        }
    }

    const {name, email, imageUrl} = validateFields.data

    try {
        await sql`insert into customer (name, email, image_url) values (${name}, ${email}, ${imageUrl})`
    } catch (error) {
        throw new Error("Faild to create customer");
    }

    revalidatePath('/customers')
    redirect('/customers');

}