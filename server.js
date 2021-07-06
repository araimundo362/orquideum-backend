const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

const PORT = 8080;
let counterItem = 0;
let counterItemRandom = 0;

var bparser = bodyParser.urlencoded();

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
    counterItem++;
    productos = await getProductos();
    res.send({
        productos,
        cantidad: productos.length})
  })
  
  
app.get('/item-random', async (req, res) => {
    counterItemRandom++;
    productos = await getProductos();
    let random = Math.floor(Math.random() * (productos.length));
    console.log('productos on items random', productos[random]);
  });
  
  
app.get('/visitas', (req, res) => {
    res.send({
        visitas: {
            items: counterItem,
            item: counterItemRandom
        }
    })
  })
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))