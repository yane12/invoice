import Link from 'next/link'
import React from 'react'
import { fetchPlantPages } from '../lib/plants/data';
import Table from '../ui/plants/table';

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = searchParams?.page || 1;

    const totalPages = await fetchPlantPages(query)

    return (
        <div>
            <Link href='/plants/create'>New Plant</Link>
            <Table query={query} totalPages={totalPages} />
        </div>
    )
}
