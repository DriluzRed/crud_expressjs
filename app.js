const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; // o el puerto que prefieras

let products = [
    { id: 1, name: 'Test 1', description: 'Descripción del Producto 1' },
    { id: 2, name: 'Test 2', description: 'Descripción del Producto 2' },
];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// Rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'Inicio' });
});

app.get('/productos', (req, res) => {
    res.render('productos', { title: 'Lista de Productos', products });
});

app.get('/agregar_producto', (req, res) => {
    res.render('agregar_producto', { title: 'Agregar Producto' });
});

app.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el parámetro a número entero
    const product = products.find(product => product.id === id);

    if (product) {
        res.render('producto', { title: 'Ver Producto', product });
    } else {
        res.send('Producto no encontrado');
    }
});



app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body; // Utiliza req.body para acceder a los datos
    console.log(updatedProduct);
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});



app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});


app.post('/productos', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Genera un nuevo ID

    products.push(newProduct);

    res.json({ success: true });
});



// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
