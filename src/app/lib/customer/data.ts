import { sql } from "@vercel/postgres";
import { Customer } from "./types";

export async function fetchCustomer() {
    try {
        const customers = await sql<Customer>`SELECT * FROM customer`;
        return customers.rows

    } catch (error) {
        throw new Error("Failed to fetch Customers");
           
    }
}

export async function fetchCustomerById(id: string) {
    try {
        const data = await sql<Customer>`select * from customer where id = ${id}`;
        const customer = data.rows
        return customer
    } catch (error) {
        throw new Error("failed to fetch customer");
        
    }
}