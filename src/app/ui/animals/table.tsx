import { fetchFilterdAnimals } from '@/app/lib/animals/data'
import React from 'react'

export default async function Table({ query, currentPage }:
    { query: string, currentPage: number }) {
        const animals = await fetchFilterdAnimals(query, currentPage)
    return (

        <div>
            <ul>
                {animals.map((animal) => (
                    <li key={animal.id}>{animal.name}</li>
                ))}
            </ul>
        </div>
    )
}
