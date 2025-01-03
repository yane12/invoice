import React from 'react'
import { fetchUsers } from '../lib/data'

export default async function Page() {
  const users = await fetchUsers()

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
