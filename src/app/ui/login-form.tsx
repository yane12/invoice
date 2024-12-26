'use client'
import React, { useActionState } from 'react'
import { authenticate } from '../lib/animals/actions'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )
  return (
    <form action={formAction}>
      <div>
        <h1>Please Log in to continue</h1>
      </div>
      <div>
        <label htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id='email'
          name='email'
          placeholder='Enter your email address'
          required
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          id='password'
          name='password'
          placeholder='Enter Password'
          required
          minLength={6}
        />
      </div>
      <div>
        <button>Log in</button>
      </div>
      <div>
        {errorMessage && (<p>{errorMessage}</p>)}
      </div>
    </form>
  )
}
