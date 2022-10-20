const fs = require('fs');
let archivo = "src/Productos.json";
const path = require('path');



const filePath = path.resolve(__dirname,"../../src/Productos.json");
console.log(filePath);

module.exports = class ContenedorProductos{

    constructor(archivo){
        archivo = this.archivo;
    }

    getAllProductos = async() =>{
        const products = await fs.promises.readFile(filePath, "utf-8");
        return JSON.parse(products);
    }

    getByIdProducto = async(id) =>{
        const products = await this.getAllProductos();
        return new Promise((res, rej)=>{
            if(products != null && id != null){
               const produtoEncontrado = products.findIndex((unProducto) => unProducto.id == id);
               if(produtoEncontrado < 0){
                throw new Error('El producto no existe');
              }
               res(products[produtoEncontrado]);
              
            }else{
              rej('Error no se encontro el Id');
            }
        });
    }


    saveProducto = async(req) =>{
        const products = await this.getAllProductos();
        let id = 1;
        const {nameProduct,price} = req.body;

        if(products.length){
            id = products[products.length -1].id + 1;
        }
        const nuevoProductoAgregado = {
            nameProduct,
            price,
            id : id
        }
        console.log('entro');
        if(!nuevoProductoAgregado){
            return ('Campos invalidos');
        }else{
            products.push(nuevoProductoAgregado);
            const data = JSON.stringify(products, null, '\t');
            const lista = fs.writeFile(filePath, data, (err)=>{
                if(err){
                    console.log("No se pudo guardar");
                }
                return ('El producto fue guardado con exito');
            });
            
        }
        
    }
    
    actualizaProducto = async(req,res)=>{
        const id = req.id;
        const products = await this.getAllProductos();
        const {nameProduct,price} = req;

        const indice = products.findIndex(unProducto => unProducto.id == id);
        if(indice <0){return res.status(404).send("Error la lista no se escuentra")}

         
        const productoActualizado = {
            nameProduct,
            price,
            id : req.id
        }
        products.splice(indice,1,productoActualizado);
        console.log(productoActualizado);
        await fs.writeFile(filePath, JSON.stringify(products,null, '\t'), (err)=>{
            if(err){
                console.log("No se pudo actualizado");
            }
            return ('El producto actualizado con exito');
        });

        return ('Modificando objeto con id');

    }

    eliminarProducto = async(req,res)=>{
        const id = req;
        const products = await this.getAllProductos();
        const indice = products.findIndex(unProducto => unProducto.id == id);
        products.splice(indice,1);
        await fs.writeFile(filePath, JSON.stringify(products,null, '\t'), (err)=>{
                if(err){
                    console.log("No se pudo eliminar");
                }
                return res('El producto fue eliminado con exito');
            });
    }


}