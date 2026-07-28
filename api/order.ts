import { put } from '@vercel/blob';
import { Resend } from 'resend';
import { Pool } from 'pg';
import { attachDatabasePool } from "@vercel/functions";

const pool = new Pool({
  connectionString: process.env.INVENTORY_DATABASE_URL,
});

attachDatabasePool(pool);

const resend = new Resend(process.env.RESEND_API_KEY);

function getItemizedOrder(selectedFlavors: Record<string, number>, receptionMethod: string) {
  const filteredFlavors = Object.entries(selectedFlavors).filter(([_, quantity]) => Number(quantity) > 0);
  const totalJars = filteredFlavors.reduce((acc, [_, quantity]) => {
    return acc + Number(quantity);
  }, 0)
  const lowerSubtotal = totalJars * 9;
  const upperSubtotal = totalJars * 19;
  const receptionPrice = receptionMethod === 'pickup' ? 0 : 10;
  const lineItems = filteredFlavors.map(([flavor, quantity]) => {
    return `${quantity} ${flavor} - $${quantity*9}-${quantity*19}`
  });
  lineItems.push(`${receptionMethod} - $${receptionPrice}`)
  lineItems.push(`total - $${lowerSubtotal+receptionPrice}-${upperSubtotal + receptionPrice}`)
  lineItems.push(`DEBUGGING totalJars is ${totalJars}`)
  return lineItems.join('<br/>');
}

type OrderRequestBody = {
  name: string;
  email: string;
  receptionMethod: string;
  preferredCommunication: string;
  selectedFlavors: Record<string, number>;
};

export async function POST(req: Request) {
    const resBody: OrderRequestBody = await req.json();
    const {
      name,
      receptionMethod,
      selectedFlavors,
      preferredCommunication
    } = resBody;
    const itemizedOrder = getItemizedOrder(selectedFlavors, receptionMethod);
    
      const url = await put(
        `orders/${name || 'order'}.txt`,
        JSON.stringify(resBody), 
        { access: 'private', addRandomSuffix: true, contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN }
      );

      // const client = await pool.connect();
      // try {
      //     const filteredFlavors = Object.entries(resBody.selectedFlavors).filter(([_, quantity]) => !!quantity);
      //     const caseString = filteredFlavors.map(([flavor, quantity]) => {
      //       return `WHEN '${flavor}' THEN available_count - ${quantity}`
      //     }).join(' ');
      //     const flavorList = filteredFlavors.map(([flavor]) => `'${flavor}'`).join(',')
      //     await client.query(
      //       `UPDATE jams SET available_count = CASE name ${caseString} END WHERE name in (${flavorList})`
      //     );
      // } catch (err) {
      //     console.error('Connection failed.', err);
      // } finally {
      //     client.release();
      // }

      const { data, error } = await resend.batch.send([{
        from: 'kiana joon <kiana.joon@frootfairy.com>',
        to: [resBody.email],
        template: {
          id: 'order-ready',
          variables: {
            name: name,
            itemized_order: itemizedOrder
          }
        },
      },
      {
        from: 'kiana joon <kiana.joon@frootfairy.com>',
        to: ['kianadkavoosi@gmail.com'],
        template: {
          id: 'admin-order-ready',
          variables: {
            name: name,
            itemized_order: itemizedOrder,
            preferred_communication: preferredCommunication
          }
        }
      }]);
    
      if (error) {
        return console.error({ error });
      }
      return new Response(JSON.stringify({ url, data }));
} 