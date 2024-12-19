import React from 'react'
import { fetchCustomer } from '../lib/customer/data'
import Link from 'next/link'
import Search from '../ui/customer/search'
import Pagination from '../ui/customer/pagination'

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const customers = await fetchCustomer()
  const totalPages = customers.length
  return (
    <div>
      <h1 className='mb-4'>Customers</h1>
      <Link href='/customers/create'>New</Link>
      <Search />
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>

      <Pagination totalPages={totalPages} />
    </div>
  )
}
