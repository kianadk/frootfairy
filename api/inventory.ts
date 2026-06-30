import 'dotenv/config';
import { Pool } from 'pg';
import { attachDatabasePool } from "@vercel/functions";

const pool = new Pool({
  connectionString: process.env.INVENTORY_DATABASE_URL,
});

attachDatabasePool(pool);

export async function GET() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM jams WHERE should_display=TRUE;');
        client.release();
        return new Response(JSON.stringify(rows));
    } catch (err) {
        console.error('Connection failed.', err);
    } finally {
        client.release();
    }
} 