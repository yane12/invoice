import { sql } from "@vercel/postgres";
import { Customer } from "./types";

export async function fetchCustomers() {
    try {
        const data = await sql<Customer>`select * from customer`
    } catch (error) {
        throw new Error('failed to fetch customers')
    }
}