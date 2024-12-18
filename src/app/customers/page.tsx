import React from 'react'
import { fetchCustomer } from '../lib/customer/data'
import Link from 'next/link'
import Search from '../ui/customer/search'

export default async function Page() {
  const customers = await fetchCustomer()
  return (
    <div>
      <h1 className='mb-4'>Customers</h1>
      <Link href='/customers/create'>New</Link>
      <Search/>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  )
}