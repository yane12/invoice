import { sql } from "@vercel/postgres";
import { Note } from "./types";

export async function fetchNote() {
    try {
        const notes = await sql<Note>`select * from notes`;
        return notes.rows;
    } catch (error) {
        throw new Error("Failed to fetch notes");
        
    }
}