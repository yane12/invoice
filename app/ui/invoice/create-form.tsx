'use client'
import { createInvoice, InvoiceState } from '../../lib/actions'
import { Customer } from '../../lib/types'
import { error } from 'console';
import Link from 'next/link';
import React, { useActionState } from 'react'
import { effect } from 'zod';

export default function Form({ customers }: { customers: Customer[] }) {
  const initialState: InvoiceState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);
  return (
    <div>
      <form action={formAction}>
        <div>
          <div>
            <label htmlFor="customer">Choose Customer</label>
            <div className='relative'>
              <select
                name="customerId"
                id="customer"
                defaultValue=""
                aria-describedby='customer-error'
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {
                  customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))
                }
              </select>
            </div>
            <div id='customer-error'>
              {state.errors?.customerId &&
                state.errors?.customerId.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
            </div>
            <div>
              <label htmlFor="amount">Choose an amount</label>
              <div>
                <input
                  id='amount'
                  name='amount'
                  step="0.01"
                  placeholder='Enter USD amount'
                  aria-describedby='amount Erro'
                  type="number" />
              </div>

              <div>
                {state.errors?.amount &&
                  state.errors?.amount.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))
                }
              </div>
            </div>
            <div>
              <legend>
                set the invoice status
              </legend>
              <div>
                <input
                  id='pending'
                  name='status'
                  value='pending'
                  type="radio" />
                <label htmlFor="pending">Pending</label>
              </div>
              <div>
                <input
                  id='paid'
                  value='paid'
                  name='status'
                  type="radio" />
                <label htmlFor="paid">Paid</label>
              </div>

              <div>
                {state.errors?.status && 
                  state.errors?.status.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))
                }
              </div>

              <div>
                {state.message ? (
                  <p>{state.message}</p>):null
                }
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link href='invoices'>Cancel</Link>
          <button>Create Invoice</button>
        </div>
      </form>
    </div>
  )
}
