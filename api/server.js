import 'dotenv/config';
import express from 'express';
import path from 'path';
import { Pool } from 'pg';
import { put } from '@vercel/blob';
import { Resend } from 'resend';

const app = express();
const PORT = process.env.PORT || 3000;
const currentDir = import.meta.dirname;


const resend = new Resend(process.env.RESEND_API_KEY);

// Serve the static files from the React app's build directory
app.use(express.static(path.join(currentDir, 'build'), { redirect: false }));

// parse json bodies
app.use(express.json()); 

function generateConfirmationEmail(data) {
  const name = data.name;
  const selectedFlavors = data.selectedFlavors;
  const flavorString = Object.entries(selectedFlavors).reduce((accumulator, [flavor, quantity], index) => {
    if (quantity === 0) return accumulator;
    return accumulator + `${index > 0 ? ', ': ''}${quantity} jar${quantity > 1 ? 's' : ''} of ${flavor}`
  }, '');
  return `hello ${name},<br /><br /> thanks for placing a froot fairy order! we'll be reaching out to you shortly to confirm details. contact kiana.joon@frootfairy.com if you need anything in the meantime<br/><br/> your order: ${flavorString}`
};

const pool = new Pool({
  connectionString: process.env.INVENTORY_DATABASE_URL,
});

// API routes
app.get('/api/inventory', async () => {
    console.log('db url is ', process.env.INVENTORY_DATABASE_URL)
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
}); 

app.post('/api/order', async (req, res) => {
  const name = req.body.name || 'order';

  const url = await put(
    `orders/${name}.txt`,
    JSON.stringify(req.body), 
    { access: 'private', addRandomSuffix: true, contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN }
  );
  const { data, error } = await resend.batch.send([{
    from: 'kiana joon <kiana.joon@frootfairy.com>',
    to: [req.body.email],
    subject: 'frooty greetings',
    html: `<div>${generateConfirmationEmail(req.body)}</div>`,
  },
  {
    from: 'kiana joon <kiana.joon@frootfairy.com>',
    to: ['kianadkavoosi@gmail.com'],
    subject: 'you got a froot fairy order',
    html: `<div>Here is the order <br/> ${generateConfirmationEmail(req.body)}</div>`,
  }]);

  if (error) {
    return console.error({ error });
  }
  res.json({ url, data });
});

// SPA fallback: Any request that doesn't match an API route will send the index.html file
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
