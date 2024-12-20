import { fetchFilteredPlants } from '@/app/lib/plants/data';
import React from 'react'

export default async function Table({ query, totalPages }: {
    query: string; totalPages: number
}) {

    const plants = await fetchFilteredPlants(query, totalPages)

    return (
        <div>
            <ul>
                {plants.map((plant)=> (
                    <li key={plant.id}>{plant.name}</li>
                ))}
            </ul>
        </div>
    )
}
