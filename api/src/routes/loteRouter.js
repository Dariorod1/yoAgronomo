const server = require("express").Router();

const upload = require('./../libs/storage');


const {
  deleteManejo,getAllManejo,updateManejo,createManejo,getAllLotes,getLoteByName,getLoteById,deleteLote,createLote,updateLote,getImageLote
} = require("../controllers/loteController");

//////////////////////////////////////////////////////

server.post('/create', upload.single("imagen"), createLote)
server.get('/imagen/:name', getImageLote)



///////////////////////////////////////////////////
server.get("/empresa/:id", getAllLotes)
server.get("/:id", getLoteById)
server.get("/name", getLoteByName)
server.delete("/delete/:id",deleteLote)
server.put("/:id", updateLote);

/////// MANEJO DE LOTE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

server.get("/manejos/:id", getAllManejo)
server.post("/createManejo/:loteId", createManejo)
server.put('/updateManejo/:id', updateManejo)
server.delete("/deleteManejo/:id",deleteManejo)



module.exports = server;

