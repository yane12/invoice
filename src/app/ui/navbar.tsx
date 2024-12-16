import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='flex justify-between'>
            <Link href='/'>Dashboard</Link>
            <ul className='flex gap-4'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/invoices'>Invoices</Link></li>
            </ul>
        </div>
    )
}