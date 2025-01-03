'use client'
import { ArrowLeftIcon, ArrowRightIcon, H1Icon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({totalPages} : {totalPages: number}) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const currentPage = Number(searchParams.get('page')) || 1

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }



    return (
        <div className='flex gap-4'>
            <PaginationArrow direction='left' href={createPageUrl(currentPage-1)} isDisabled={currentPage <= 1} />
            <p>pages</p>
            <PaginationArrow direction='right' href={createPageUrl(currentPage+1)} isDisabled={currentPage >= totalPages} />
        </div>
    )
}

function PaginationArrow(
    {
        href,
        direction,
        isDisabled,
    }: {
        href: string,
        direction: string,
        isDisabled: boolean
    }) {

    const icon = direction === 'left' ? (<ArrowLeftIcon className='w-4'></ArrowLeftIcon>) : (<ArrowRightIcon className='w-4'></ArrowRightIcon>)
    return isDisabled ? ( <div className=''>{icon}</div> ) : (
        <Link href={href}>{icon}</Link>
    )
}
