const express = require('express');
const rutaProductos = require('../routes/index');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/api/productos', rutaProductos);

 module.exports = app;