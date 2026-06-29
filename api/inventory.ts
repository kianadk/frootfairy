import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.INVENTORY_DATABASE_URL,
});

export async function GET() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT * FROM jams WHERE should_display=TRUE;');
        return new Response(JSON.stringify(rows));
    } catch (err) {
        console.error('Connection failed.', err);
    } finally {
        client.release();
        pool.end();
    }
} 