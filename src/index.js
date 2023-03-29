const server = require('./services/server');

const port = process.env.PORT || 8080;

server.listen(PORT, ()=>{
   console.log('Servidor escuchando en el puerto ' + PORT);
});
