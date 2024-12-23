'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Search() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1')

        if(term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }  
    return (
        <div>
            <label htmlFor="search">Search</label>
            <div>
                <input
                    placeholder='search plants...'
                    onChange={(e) => {handleSearch(e.target.value)}}
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
        </div>
    )
}
