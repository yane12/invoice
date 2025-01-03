'use client'
import React, { useActionState } from 'react'
import Link from 'next/link'
import { authenticate } from '../lib/actions'

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )
  return (
    <div>
      <div>
        <Link href='/signup'>Sign up</Link>
      </div>
      <form action={formAction}>
        <div>
          <h1>Please Log in to continue</h1>
        </div>
        <div>
          <label htmlFor="email">
            Email
          </label>
          <div>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Enter your email address'
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              id='password'
              name='password'
              placeholder='Enter Password'
              required
              minLength={6}
            />
          </div>

        </div>
        <div>
          <button aria-disabled={isPending}>Log in</button>
        </div>
        <div>
          {errorMessage && (<p>{errorMessage}</p>)}
        </div>
      </form>
    </div>

  )
}
