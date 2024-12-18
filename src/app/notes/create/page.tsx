import { fetchNotes } from '@/app/lib/notes/data'
import Form from '@/app/ui/note/create-form'
import React from 'react'

export default async function Page() {
  const notes = await fetchNotes()
  return (
    <div>
      <h1>Create Note</h1>
      <Form/>
    </div>
  )
}
