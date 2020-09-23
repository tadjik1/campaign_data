const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

function rnd(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function main() {
  const num_of_campaigns = 100;
  const num_of_categories = 10;
  const num_of_products = 1000;

  const campaigns = [];
  const categories = [];
  const products = [];

  for (let i = 0; i < num_of_campaigns; i++) {
    campaigns.push({
      id: uuid.v4(),
      name: `Campaign ${i + 1}`,
      budget: rnd(100, 600),
      products: [],
    });
  }

  for (let j = 0; j < num_of_categories; j++) {
    categories.push({
      id: uuid.v4(),
      name: `Category ${j + 1}`,
    });
  }

  for (let y = 0; y < num_of_products; y++) {
    products.push({
      id: uuid.v4(),
      name: `Product ${y + 1}`,
      price: rnd(4, 20),
      category: categories[rnd(0, num_of_categories)].id
    });
  }

  for (const campaign of campaigns) {
    const products_set = new Set()
    for (let z = 0; z < rnd(40, 80); z++) {
      products_set.add(products[rnd(0, num_of_products)].id);
    }
    campaign.products = Array.from(products_set);
  }

  fs.writeFileSync(
    path.join(__dirname, 'db.json'),
    JSON.stringify({
      campaigns, products, categories,
    }, null, 2),
  );
}

main().then(() => console.log('all done')).catch(console.error);