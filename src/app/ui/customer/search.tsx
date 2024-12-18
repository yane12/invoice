'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Search() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handleChange = (term: string) => {
        const params = new URLSearchParams(searchParams)

        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }

        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div>
            <input
                placeholder="Searching..."
                onChange={(event) => {handleChange(event.target.value)}}
                defaultValue={searchParams.get('query')?.toString()}
            />
        </div>
    )
}
