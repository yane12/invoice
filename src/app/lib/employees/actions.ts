import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: 'Please Enter Name' }),
    gender: z.string().trim().min(1, { message: 'Please Enter Gender' })
})

const CreateEmployee = FormSchema.omit({ id: true })
const UpdateEmployee = FormSchema.omit({ id: true })

export type EmployeeState = {
    errrors?: {
        name?: string[];
        gender?: string[];
    };
    message: string | null
}

export async function createEmployee(prevState: EmployeeState, formData: FormData) {
    const validateFields = CreateEmployee.safeParse({
        name: formData.get('name'),
        gender: formData.get('gender')
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Failed to create Employee'
        }
    }

    const { name, gender } = validateFields.data

    try {
        await sql`insert into employees (name, gender) values (${name}, ${gender})`

    } catch (error) {
        return {
            message: 'Failed to create Employee'
        }
    }

    revalidatePath('/employees')
    redirect('/employees')
}

export async function updateEmployee(id: string, prevState: EmployeeState, formData: FormData) {
    const validateFields = UpdateEmployee.safeParse({
        name: formData.get('name'),
        gender: formData.get('gender')
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Failed to update Employee'
        }
    }

    const { name, gender } = validateFields.data

    try {
        await sql`update Employee set name = ${name}, gender =  ${gender} 
        where id == ${id}`
    } catch (error) {
        return {
            message: 'Failed to update Employee'
        }
    }

    revalidatePath('/employees')
    redirect('/employees')
}

export async function deleteEmployee(id: string) {
    await sql`delete form employees where id == ${id}`
    revalidatePath('/employees')
}
