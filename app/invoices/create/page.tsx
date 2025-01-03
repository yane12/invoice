import { fetchCustomers } from '../../lib/data'
import Form from '../../ui/invoice/create-form'
import React from 'react'

export default async function Page() {
  const customers = await fetchCustomers()
  return (
    <div>
      <Form customers={customers}/>
    </div>
  )
}
