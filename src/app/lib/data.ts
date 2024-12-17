import { sql } from "@vercel/postgres";
import { Customer } from "./types";


export async function fetchUsers() {
    try {
        const data = await sql`select * from users`
        return data.rows
    } catch(error) {
        throw new Error("failed to fetch users");
    }
}

export async function fetchCustomers() {
    try {
        const data = await sql<Customer>`select * from customer`
        return data.rows
    } catch (error) {
        throw new Error('failed to fetch customers')
    }
}

