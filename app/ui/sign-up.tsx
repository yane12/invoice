'use client';
import React, { useActionState } from 'react'
import { createUser, UserState } from '../lib/users/actions'
import Link from 'next/link';

export default function SignupForm() {
    const initialState: UserState = {message: null, errors: {}}
    const [state, formAction] = useActionState(createUser, initialState)
    
    return (
        <div>
            <form action={formAction}>
                <div>
                    <div><label htmlFor="name">Name</label></div>
                    <div><input type="text" name='name' id='name'/></div>
                    {state.errors?.name && state.errors.name.map((error: string) => (
                        <p key={error}>{error}</p>
                    ))}
                </div>
                <div>
                    <div><label htmlFor="email">Email</label></div>
                    <div><input type="email" name="email" id="email" required /></div>
                    {state.errors?.email && state.errors.email.map((error: string) => (
                        <p key={error}>{error}</p>
                    ))}
                </div>

                <div>
                    <div><label htmlFor="password">password</label></div>
                    <div><input type="password" name="password" id="password" required minLength={6} /></div>
                    {state.errors?.password && state.errors.password.map((error: string) => (
                        <p key={error}>{error}</p>
                    ))}
                </div>

                <div>
                    {state.message && (<p>{state.message}</p>)}
                </div>

                <div className='flex gap-8'>
                    <Link href='/login'>Cancel</Link>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
