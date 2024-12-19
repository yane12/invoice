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

export async function fetchProductPage(query: string) {
    const itemsPerPage = 6;
    try {
        const data = await sql`select count(*) from products
            where name ilike ${`%${query}%`}`;
        
        const totalPages = Math.ceil(Number(data.rows[0].count) / itemsPerPage)
        return totalPages;
    } catch (error) {
        throw new Error("Faild to fetch total number of products");
        
    }
}