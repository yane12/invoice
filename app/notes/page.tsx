import React from 'react'
import { fetchNotes } from '../lib/notes/data'
import Search from '../ui/note/search'
import Pagination from '../ui/note/pagination'
import Link from 'next/link'

export default async function Page() {
  const notes = await fetchNotes()
  const totalPages = notes.length
  return (
    <div>
      <h1>Notes</h1>
      <Link href='/notes/create'>New Note</Link>
      <Search/>
      <ul>{notes.map((note) => (
        <li key={note.id}>{note.title}</li>
      ))}</ul>
      <Pagination totalPages={totalPages} />
    </div>
  )
}
