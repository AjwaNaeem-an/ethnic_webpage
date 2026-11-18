const express = require('express');
const app = express();
const PORT = 3000;

// ---------- Middleware ----------

// JSON body parse karne ke liye
app.use(express.json());

// Custom logger: har request pe method, path aur time print karega
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.path}`);
  next(); // zaroori hai, warna request ruk jayegi
});

// ---------- Data (in-memory) ----------

let products = [
  { id: 1, name: 'Eastern Wear', category: 'eastern', price: 5000, available: true },
  { id: 2, name: 'Western Wear', category: 'western', price: 5000, available: true },
  { id: 3, name: 'Casual Wear', category: 'casual', price: 3500, available: false }
];

// ---------- Endpoints ----------

// 1. GET all products (+ optional ?category=eastern)
app.get('/api/products', (req, res) => {
  const { category } = req.query;

  if (category) {
    const filtered = products.filter(p => p.category === category);
    return res.status(200).json(filtered);
  }

  res.status(200).json(products);
});

// 2. GET single product by id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.status(200).json(product);
});

// 3. POST add new product
app.post('/api/products', (req, res) => {
  const { name, category, price, available } = req.body;

  if (!name || price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({
      error: 'name and a price greater than 0 are required'
    });
  }

  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: name,
    category: category || 'casual',
    price: price,
    available: available !== undefined ? available : true
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 4. PATCH toggle available (in stock / sold out)
app.patch('/api/products/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  product.available = !product.available;
  res.status(200).json(product);
});

// 5. DELETE product
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deleted = products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted', product: deleted[0] });
});

// ---------- Start server ----------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});