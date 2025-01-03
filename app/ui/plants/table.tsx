import { fetchFilteredPlants } from '../../lib/plants/data';
import React from 'react'

export default async function Table({ query, currentPage }: {
    query: string; currentPage: number | string
}) {

    const plants = await fetchFilteredPlants(query, Number(currentPage))

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
