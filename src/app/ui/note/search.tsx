'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <label htmlFor="search"></label>
            <input
                type="text" 
                placeholder='Search..'
                name='search'
                onChange={(e)=>handleSearch(e.target.value)}
                defaultValue={searchParams.get('query')?.toString()}
                />
        </div>
    )
}
