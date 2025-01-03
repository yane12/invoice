import Link from 'next/link'
import React from 'react'
import { fetchPlantPages } from '../lib/plants/data';
import Table from '../ui/plants/table';
import Search from '../ui/plants/search';
import Pagination from '../ui/plants/pagination';

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
            <Search/>
        
            <Table query={query} currentPage={currentPage} />

            <Pagination totalPages={totalPages}/> 
            
        </div>
    )
}
