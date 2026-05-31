import { put } from '@vercel/blob';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateConfirmationEmail(data) {
  const name = data.name;
  const selectedFlavors = data.selectedFlavors;
  const flavorString = Object.entries(selectedFlavors).reduce((accumulator, [flavor, quantity], index) => {
    if (quantity === 0) return accumulator;
    return accumulator + `${index > 0 ? ', ': ''}${quantity} jar${quantity > 1 ? 's' : ''} of ${flavor}`
  }, '');
  return `hello ${name},<br /><br /> thanks for placing a froot fairy order! we'll be reaching out to you shortly to confirm details. contact kiana.joon@frootfairy.com if you need anything in the meantime<br/><br/> your order: ${flavorString}`
};

export async function POST(req: Request) {
    const resBody = await req.json();
    const name = resBody.name || 'order';
    
      const url = await put(
        `orders/${name}.txt`,
        JSON.stringify(req.body), 
        { access: 'private', addRandomSuffix: true, contentType: 'application/json', token: process.env.BLOB_READ_WRITE_TOKEN }
      );
      const { data, error } = await resend.batch.send([{
        from: 'kiana joon <kiana.joon@frootfairy.com>',
        to: [resBody.email],
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
      return new Response(JSON.stringify({ url, data }));
} 