import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='flex justify-between'>
            <Link href='/'>Dashboard</Link>
            <ul className='flex gap-4'>
                <li><Link href='/'>Home</Link></li>
                <li><Link href='/invoices'>Invoices</Link></li>
                <li><Link href='/notes'>Notes</Link></li>
                <li><Link href='/customers'>Customers</Link></li>
                <li><Link href='/products'>Products</Link></li>
                <li><Link href='/plants'>Plants</Link></li>
                <li><Link href='/animals'>Animals</Link></li>
            </ul>
        </div>
    )
}
