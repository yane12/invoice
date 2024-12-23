'use client'
import { createPlant, PlantState } from '@/app/lib/plants/actions'
import Link from 'next/link';
import React, { useActionState } from 'react'


export default function Form() {
    const initialState: PlantState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createPlant, initialState)
    return (
        <form action={formAction}>
            <div>
                <div><label htmlFor="name">Name</label></div>
                <div><input type="text" name='name' id='name' /></div>
                <div>{state.errors?.name && state.errors.name.map((error: string) => (
                    <p key={error}>{error}</p>
                ))}</div>
            </div>
            <div>
                <div><label htmlFor="color">Color</label></div>
                <div><input type="text" name='color' id='color' /></div>
                <div>{state.errors?.color && state.errors.color.map((error: string) => (
                    <p key={error}>{error}</p>
                ))}</div>
            </div>
            <div>
                {state.message ? (<p>{state.message}</p>) : null}
            </div>
            <div className='flex gap-8'>
                <Link href='/plants'>Cancel</Link>
                <button type='submit'>Create Plant</button>
            </div>
        </form>
    )
}
