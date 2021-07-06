const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const PORT = 8080;

const visitas = {
  item: 0, // Visitas a /random-item
  items: 0, // Visitas a /items
};

let productos;

const getProductos = async () => {
    try {
        let prod = await fs.promises.readFile("./productos.txt");
        return JSON.parse(prod);
      } catch {
        return []; 
      }
}

app.get('/items', async (req, res) => {
    visitas.items++;
    productos = await getProductos();
    res.send({
        productos,
        cantidad: productos.length})
  })
  
  
app.get('/item-random', async (req, res) => {
    visitas.item++;
    productos = await getProductos();
    let random = Math.floor(Math.random() * (productos.length));
    res.send({
      producto: productos[random]
    });
  });
  
  
app.get('/visitas', (req, res) => {
    res.send(visitas);
});
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))