'use client'
import { createCustomer, CustomerState } from '../../lib/customer/actions'
import Link from 'next/link';
import React, { useActionState } from 'react'

export default function Form() {
    const intialState: CustomerState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createCustomer, intialState);
    return (
        <form action={formAction}>
            <div>
                <div>
                    <label htmlFor="name">Name</label>
                </div>
                <div>
                    <input type="text" id='name' name='name' />
                </div>
                <div>
                    {state.errors?.name &&
                        state.errors.name.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))
                    }
                </div>
            </div>

            <div>
                <div><label htmlFor="email">Email</label></div>
                <div><input type="text" id='email' name='email' /></div>
                <div>{state.errors?.email && state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                ))}</div>
            </div>

            <div>
                <div><label htmlFor="image_url">Image Url</label></div>
                <div><input type="text" id='image_url' name='image_url'/></div>
                <div>{state.errors?.imageUrl&& state.errors.imageUrl.map((error: string) => (
                    <p key={error}>{error}</p>
                ))}</div>
            </div>
            <div>
                {state.message ? (<p>{state.message}</p>) : null}
            </div>

            <div className='flex gap-8'>
                <Link href='/customers'>Cancel</Link>
                <button type='submit'>Create Customer</button>
            </div>
        </form>
    )
}
