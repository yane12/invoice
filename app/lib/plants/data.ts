import { sql } from "@vercel/postgres";
import { Plant } from "./types";

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredPlants(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try {
        const data = await sql<Plant>`select * from plants where name 
        ilike ${`%${query}%`} limit ${ITEMS_PER_PAGE} offset ${offset}`;

        const plants = data.rows
        return plants
    } catch (error) {
        throw new Error("Failed to fetch plants");
    }
}

export async function fetchPlantPages(query: string) {
    try {
        const data = await sql`select count(*) from plants where name
        ilike ${`%${query}%`}`;

        const totalPages = Math.ceil(Number(data.rows[0].count) / ITEMS_PER_PAGE)
        return totalPages;
    } catch (error) {
        throw new Error("Failed to fetch number plant");
        
    }
}