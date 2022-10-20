const { Router } = require('express');
const rutaProductos = Router();
let contenedor = require('../services/contenedorProductos');
let contenedorNuevo = new contenedor;


rutaProductos.get('/',  async(req,res) =>{
    let listaProductos = await contenedorNuevo.getAllProductos();
    console.log('Consultando todos los productos');
    res.json(listaProductos);
 });
 
 rutaProductos.get('/:id',  async(req,res) =>{
     id = req.params.id;
     console.log(id);
     let productoEncontrado = await contenedorNuevo.getByIdProducto(id);
     res.send(productoEncontrado);
  });
 
  rutaProductos.post('/',async (req,res)=>{
     let nuevoProducto = await contenedorNuevo.saveProducto(req);
     res.send(nuevoProducto);
  });
 
  rutaProductos.put('/:id',async (req,res)=> {
     let actualizaProducto = await contenedorNuevo.actualizaProducto(req);
     res.send(actualizaProducto);
  });
 
  rutaProductos.delete('/:id', async(req,res) =>{
      
     let eliminaProducto = await contenedorNuevo.eliminarProducto(req);
     res.send(eliminaProducto);
  });

  module.exports = rutaProductos;