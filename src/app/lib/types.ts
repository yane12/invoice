import { string } from "zod";

export type Customer = {
    id: string;
    name: string;
    email: string;
    image_url: string;
}

export type Invoice = {
    id: string;
    customerId: string;
    amount: number;
    date: string;
    status: 'pending'| 'paid';
}