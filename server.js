const express = require('express');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const PORT = 8080;

/* type producto = {
  title: string,
  price: number,
  thumbnail: string,
}
*/

let productos = [];

router.get('/productos/listar', async (req, res) => {
  if (productos.length) {
    res.send(productos)
  } else {
    res.send({error: 'No hay prodoctos cargados'})
  }
});
  
router.get('/productos/listar/:id', async (req, res) => {
  if ( req.params.id >= 0 && req.params.id <= productos.length) {
    res.send(productos[req.params.id]);
  } else {
    res.send({error : 'producto no encontrado'});
  }
});

router.put('/productos/actualizar/:id', async (req, res) => {
  let idArray = productos.map((elem) => elem.id);
  let id = req.params.id;
  if (idArray.includes(Number(id))) {
    productos = productos.filter((elem) => elem.id != id);
    let updatedProd = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      id
    };
    productos.push(updatedProd);
    res.send(productos);
  } else {
    res.send({error : 'producto no encontrado'});
  }  
});

router.delete('/productos/borrar/:id', async (req, res) => {
  let id = req.params.id;
  let idArray = productos.map((elem) => elem.id);
  if (idArray.includes(Number(id))) {
    productos = productos.filter((elem) => elem.id != id);
    res.send(productos);
  } else {
    res.send({error : 'producto no encontrado'});
  }
});
  
router.post('/productos/guardar/', async (req, res) => {
  let newProduct = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id: productos.length + 1
  }
  productos.push(newProduct);
  res.send(productos);
});

app.use('/api', router);
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))