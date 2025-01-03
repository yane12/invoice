import { sql } from "@vercel/postgres";
import { Animal } from "./type";
import { console } from "inspector";

const ITEMS_PER_PAGE = 6;

export async function fetchFilterdAnimals(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const data = await sql<Animal>`select * from animals where name
        ilike ${`%${query}%`} limit ${ITEMS_PER_PAGE} offset ${offset}`

        return data.rows
    } catch (error) {
        throw new Error("Fails to fetch animals");
    }
}

export async function fetchAnimalPages(query: string) {
    try {
        const data = await sql`select count(*) from animal where name
        ilike ${`%${query}%`}`;
        const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE)
        return totalPages; 
    } catch (error) {
       throw new Error("failed to fetch animal pages");
        
    }
} 