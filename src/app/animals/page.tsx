import React from 'react'
import Table from '../ui/animals/table';
import Link from 'next/link';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    currentPage?: string;
  }>
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.currentPage) || 1;
  return (
    <div>
      <Link href='/animals/create'>New Animal</Link>
      <Table query={query} currentPage={currentPage} />
    </div>
  )
}
