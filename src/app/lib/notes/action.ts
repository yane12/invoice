import { z } from "zod";
import { sql } from "@vercel/postgres";
import { title } from "process";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const NoteFormSchema = z.object({
    id: z.string(),
    title: z.string().trim().min(1, {message: 'please Enter title'}),
    content: z.string().trim().min(1, {message: 'please enter content'})
})

const CreateNote = NoteFormSchema.omit({id: true})


export type NoteState = {
    errors?: {
        title?: string[];
        content?: string[]
    };
    message?: string | null
} 

export async function createNote(prevState: NoteState, formData: FormData) {
    const validateFields = CreateNote.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    })

    if(!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'failed to create note'
        }
    }

    const {title, content} = validateFields.data

    try {
        await sql`insert into notes(title, content) values (${title}, ${content})`
    } catch (error) {
        return {
            message: 'failed to create note'
        }
    }

    revalidatePath('/notes');
    redirect('/notes');
}