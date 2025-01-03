import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
    id: z.string(),
    brand: z.string().trim().min(1, {message: 'Enter car Brand name'}),
    color: z.string().trim().min(1, {message: 'Enter color'})
})

const CreateCar = FormSchema.omit({id: true})
const UpdateCar = FormSchema.omit({id: true})

export type CarState = {
    errors?: {
        brand?: string[];
        color?: string[];
    };
    message?: string | null;
}

export async function deleteCar(id: string) {
    sql`delete from cars where id == ${id}`
    revalidatePath('/cars')
}

export async function updateCar(id: string, prevState: CarState, formData: FormData) {
    const validateFields =  UpdateCar.safeParse({
        brand: formData.get('brand'),
        color: formData.get('color')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Failed to update car'
        }
    }

    const {brand, color} = validateFields.data

    try {
        await sql`update car set brand = ${brand}, color = ${brand}
        where id == ${id}`
    } catch (error) {
        return {
            message: 'Failed to update Car'
        }
    }
    revalidatePath('/cars'),
    redirect('/cars')
}

export async function authenticate(prevState: string | null, formData: FormData) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if( error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials'
                default:
                    return 'something went wrong.'
            }
        }
        throw error;
    }
}