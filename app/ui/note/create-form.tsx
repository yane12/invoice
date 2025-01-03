'use client'
import { createNote, NoteState } from '../../lib/notes/action'
import { error } from 'console'
import Link from 'next/link'
import React, { useActionState } from 'react'

export default function Form() {
    const intialState: NoteState = { message: null, errors: {} }
    const [state, formAction] = useActionState(createNote, intialState)
    return (
        <form action={formAction}>
            <div>
                <label htmlFor="title">
                    title
                </label>
            </div>
            <div>
                <input type="text" id='title' name='title' />
            </div>
            <div>
                {state.errors?.title &&
                    state.errors.title.map((error: string) => (
                        <p key={error} >{error}</p>
                    ))}
            </div>

            <div>
                <label htmlFor="content">content</label>
            </div>
            <div>
                <textarea name="content" id="content"></textarea>
            </div>
            <div>
                {state.errors?.content && 
                    state.errors.content.map((error: string) => (
                        <p key={error}>{error}</p>
                    ))
                }
            </div>
            <div>
                {state.message ? (<p>{state.message}</p>) : null }
            </div>
            <div className='flex gap-10'>
                <Link href='/note'>Cancel</Link>
                <button type='submit'>Create Note</button>
            </div>
        </form>

    )
}
