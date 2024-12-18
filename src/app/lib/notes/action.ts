'use server'
import { z } from "zod";
import { sql } from "@vercel/postgres";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const NoteFormSchema = z.object({
    id: z.string(),
    user_id: z.string(),
    title: z.string().trim().min(1, {message: 'please Enter title'}),
    content: z.string().trim().min(1, {message: 'please enter content'})
})

const CreateNote = NoteFormSchema.omit({id: true, user_id: true})


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
    const userId = '7c80c350-e80d-4a0a-b849-a80958c24008';

    try {
        await sql`insert into notes(user_id, title, content) values ( ${userId}, ${title}, ${content})`
    } catch (error) {
        return {
            message: `db failed to create note ${error}` 
        }
    }

    revalidatePath('/notes');
    redirect('/notes');
}