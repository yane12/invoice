import { fetchNotes } from '@/app/lib/notes/data'
import React from 'react'

export default async function Page() {
  const notes = await fetchNotes()
  return (
    <div>
      <h1>Create Note</h1>

    </div>
  )
}
