'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({ totalPages }: { totalPages: number }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const currentPage = Number(searchParams.get('page')) | 1;

    const createPageUrl = (pageNumber: string | number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div>
            <PaginationArrow direction='left' href={createPageUrl(currentPage - 1)} isDisabled={currentPage <= 1} />
            <PaginationArrow direction='right' href={createPageUrl(currentPage + 1)} isDisabled={currentPage >= totalPages}  />
        </div>
    )
}

function PaginationArrow(
    {
        direction,
        href,
        isDisabled
    }:
        {
            direction: string,
            href: string,
            isDisabled: boolean
        }
) {
    const icon = direction === 'left' ? (<ArrowLeftIcon className='w-4'></ArrowLeftIcon>) :
        (<ArrowRightIcon className='w-4'></ArrowRightIcon>)
    return isDisabled ? (
        <div>{icon}</div>) :
        (
            <Link href={href}>{icon}</Link>
        )
}