export default function generateConfirmationEmail(data: { name: string, selectedFlavors: Record<string, number>}) {
  const name = data.name;
  const selectedFlavors = data.selectedFlavors;
  const flavorString = Object.entries(selectedFlavors).filter(([_, quantity]) => quantity > 0).reduce((accumulator, [flavor, quantity], index) => {
    if (quantity === 0) return accumulator;
    return accumulator + `${index > 0 ? ', ': ''}${quantity} jar${quantity > 1 ? 's' : ''} of ${flavor}`
  }, '');
  return `hello ${name},<br /><br /> thanks for placing a froot fairy order! we'll be reaching out to you shortly to confirm details. contact kiana.joon@frootfairy.com if you need anything in the meantime<br/><br/> your order: ${flavorString}`
};
