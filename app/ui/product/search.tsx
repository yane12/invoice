'use client'
import { Palanquin } from 'next/font/google'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleChange = (term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('query', term)
        }
        else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <label htmlFor="search">Search</label>
            <input
                id='search'
                placeholder={placeholder} 
                onChange={(e) => {handleChange(e.target.value)}}
                defaultValue={searchParams.get('query')?.toString()}
                />
        </div>
    )
}
