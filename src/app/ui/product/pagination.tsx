'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({ totalPages }: { totalPages: number }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const currentNumber = Number(searchParams.get('page')) | 1;

    const createPageUrl = (pageNumber: string | number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className='flex gap-8'>
            <PaginationArrow direction='left' href={createPageUrl(currentNumber - 1)} />
            <PaginationArrow direction='right' href={createPageUrl(currentNumber + 1    )} />
        </div>
    )
}

function PaginationArrow(
    {
        direction,
        href,
    }: {
        direction: string,
        href: string
    }
) {
    const icon = direction === 'left' ? (<ArrowLeftIcon className='m-4'></ArrowLeftIcon>)
        : (<ArrowRightIcon className='m-4'></ArrowRightIcon>)

    return (
        <Link href={href}>{icon}</Link>
    )
}