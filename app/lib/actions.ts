'use server'
import {z} from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '../../auth'
import { AuthError } from 'next-auth'

const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'please select a customer'
    }),
    amount: z.coerce.number()
    .gt(0, {message: 'please enter amount geater than $0'}),
    date: z.string(),
    status: z.enum(['pending', 'paid'], {invalid_type_error: 'please select an invoice status'})
})

const CreateInvoice = InvoiceFormSchema.omit({id: true, date: true})

export type InvoiceState = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
}

export async function createInvoice(prevState: InvoiceState, formData: FormData) {
    const validateFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'missing fields. faild to create invoice'
        }
    }

    const {customerId, amount, status} = validateFields.data;
    const amountInCents = amount * 100;
    const id = '7c80c350-e80d-4a0a-b849-a80958c24008';
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`insert into invoice (customer_id, amount, status, date) values 
        (${customerId}, ${amountInCents}, ${status}. ${date})`;
    } catch (error) {
        return {
            message: 'Database Error: failed to create invoice.'
        }
    }

    revalidatePath('/invoices');
    redirect('/invoices');
}


export async function authenticate(prevState: string | undefined,
    formData: FormData
) {
    try {
        console.log('hello')
        await signIn('credentials', formData)

    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type){
                case 'CredentialsSignin':
                    return 'Invalid credentials'
                default:
                    return 'something went wrong'
            }
        }

        return `nooo${error}`
    }
}