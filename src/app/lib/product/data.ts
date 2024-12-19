import { sql } from "@vercel/postgres";
import { Product } from "./types";

export async function fetchFilterdProducts(query: string, currentPage: number) {
    const itemsPerPage = 6;
    const offset = (currentPage - 1) * itemsPerPage
    try {
        const data = sql<Product>`select * from products where name ilike
         ${`%${query}%`} Limit ${itemsPerPage} offset ${offset}`
    } catch (error) {
        throw new Error("Failed to fetch products");

    }
}