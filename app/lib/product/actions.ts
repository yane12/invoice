import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'please enter product name'
    }),
    price: z.coerce.number()
        .gt(0, { message: 'please enter price greater than $0' })
})

const CreateProduct = FormSchema.omit({ id: true })
const UpdateProduct = FormSchema.omit({ id: true })

export type ProductState = {
    errors?: {
        name?: string[];
        price?: string[];
    };
    message?: string | null;
}

export async function createProduct(prevState: ProductState, formData: FormData) {
    const validateFields = CreateProduct.safeParse({
        name: formData.get('name'),
        price: formData.get('price')
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to create product'
        }
    }

    const { name, price } = validateFields.data;

    try {
        await sql`insert into products(name, price) values (${name}, ${price})`;
    } catch (error) {
        return {
            message: "Database Error: Failed to create product"
        }
    }
    revalidatePath('/products');
    redirect('/products')
}

export async function updateProduct(
    id: string,
    prevState: ProductState,
    formData: FormData
) {
    const validateFields = UpdateProduct.safeParse({
        name: formData.get('name'),
        price: formData.get('product')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Database Error: Failed to Update Products'
        }
    }

    const {name, price} = validateFields.data
    
}