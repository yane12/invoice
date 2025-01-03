'use client'
import { createProduct, ProductState } from '../../lib/product/actions'
import { error } from 'console';
import Link from 'next/link';
import React, { useActionState } from 'react'

export default function Form() {
    const intialState: ProductState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createProduct, intialState);
    return (
        <div>
            <h1>Create Product</h1>
            <form action={formAction}>
                <div>
                    <div><label htmlFor="name">Name</label></div>
                    <div><input type="text" name='name' id='name' /></div>
                    <div>{state.errors?.name && state.errors.name.map((error: string) =>
                    (
                        <p key={error}>{error}</p>
                    ))}</div>
                </div>
                <div>
                    <div><label htmlFor="price">Price</label></div>
                    <div><input type="text" name='price' id='price' /></div>
                    <div>
                        {state.errors?.price && state.errors.price.map(
                        (error: string) => (<p key={error}>{error}</p>)
                    )}</div>
                </div>
                <div>
                    {state.message ? (<p>{state.message}</p>): null }
                </div>
                <div className='flex gap-8'>
                    <Link href='/products'>Products</Link>
                    <button type='submit'>Create Product</button>
                </div>
            </form>
        </div>
    )
}
