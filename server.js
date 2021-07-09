const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = 8080;

const visitas = {
  item: 0, // Visitas a /random-item
  items: 0, // Visitas a /items
};
/* type producto = {
  title: string,
  price: number,
  thumbnail: string,
}
*/

var bparser = bodyParser.urlencoded();

let productos = [];

app.get('/api/productos/listar', async (req, res) => {
  if (productos.length) {
    res.send(productos)
  } else {
    res.send({error: 'No hay prodoctos cargados'})
  }
});
  
app.get('/api/productos/listar/:id', async (req, res) => {
  if ( req.params.id >= 0 && req.params.id <= productos.length) {
    res.send(productos[req.params.id]);
  } else {
    res.send({error : 'producto no encontrado'});
  }
});
  
app.post('/api/productos/guardar/', async (req, res) => {
  productos.push(req.body);
  console.log(req.body);
  res.send(productos);
});
  
app.get('/visitas', (req, res) => {
    res.send(visitas);
});
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))