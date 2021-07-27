/*const express = require('express');
const hbs = require('hbs');
const app = express();
const router = express.Router();
const http = require('http');
const io = require('socket.io');

const server = http.createServer(app);
// const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('views', './views/pages');
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/pages');

const PORT = 8080;

/* type producto = {
  title: string,
  price: number,
  thumbnail: string,
}


let productos = [];

io.on('connection', (socket) => {
  console.log(`El usuario ${socket.id} se conecto`)
  
  // Enviar todos los mensajes un cliente se conecta
  //socket.emit(`allMessages`, { mensajes: mensajes})
  socket.emit(`allMessages`, { mensajes: mensajes})

  socket.on('newMessage', (msg) => {
    let theMessage = {
      socketId: socket.id,
      mensaje: msg
    }
    mensajes.push(theMessage)
    io.emit('receive newMessage', [theMessage])
  })

  socket.on('disconnect', () => {
    console.log(`El usuario ${socket.id} se desconecto`);
  });

});






router.get('/productos/listar', async (req, res) => {
  if (productos.length) {
    res.send(productos)
  } else {
    res.send({error: 'No hay productos cargados'})
  }
});

router.get('/productos/vista', (req, res) => {
  res.render('index', { productos });
})
  
router.get('/productos/listar/:id', async (req, res) => {
  if ( req.params.id >= 0 && req.params.id <= productos.length) {
    res.send(productos[req.params.id]);
  } else {
    res.send({error : 'producto no encontrado'});
  }
});

router.put('/productos/actualizar/:id', async (req, res) => {
  let idArray = productos.map((elem) => elem.id);
  let id = Number(req.params.id);
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
  
router.get('/productos/guardar/', async (req,res) => {
  res.render('index', { productos });
});

router.post('/productos/guardar/', async (req, res) => {
  let newProduct = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id: productos.length + 1
  }
  productos.push(newProduct);
  res.redirect('/api/productos/guardar');
});

app.use('/api', router);
  
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))*/
const express = require('express');

const app = express();
const router = express.Router();

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('pages/index', { productos })
})

router.post('/productos/guardar/', async (req, res) => {
  console.log('req', req.body);
  let newProduct = {
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    id: productos.length + 1
  }
  productos.push(newProduct);
  res.redirect('/');
});

http.listen(3000, () => console.log('SERVER ON'))

let productos = [];

io.on('connection', (socket) => { 
  console.log('Usuario conectado');    
  socket.emit('mi mensaje', 'Este es mi mensaje desde el servidor');

  socket.on('notificacion', data => {
    console.log(data)
  })

  socket.on('addNewProduct', data => {
    console.log('escuchando en el evento addNewProduct',data);
    //product.newProduct(data);
    //io.sockets.emit('productData', { products: product.productList, isProduct: product.isListEmpty() })
});

  io.sockets.emit('productos', {productos} );
});

app.use('/api', router);

