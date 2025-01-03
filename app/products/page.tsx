import React from 'react'
import { fetchProductPage } from '../lib/product/data';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string,
    page?: string
  }>
}) {

  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = searchParams?.page || 1;

  const totalPages = await fetchProductPage(query)

  return (
    <div>Page</div>
  )
}
