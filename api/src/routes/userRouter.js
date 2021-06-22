const server = require("express").Router();
// const { 
//     isAuthenticated
// } = require("../middleware/customMiddleware");

//---------------------------------------------------------------//
const { 
    getUserAll, 
    getUserById,
    editUser,
    deleteUser,
    getEmpresaByUserId,
    updateUser

} = require("../controllers/userController");

// const {isAuthenticated} = require("../auth");

//-------------------------Route Users--------------------------//

// server.get("/", getUserAll);
// server.get("/:id", getUserById);
server.put('/edit/:id', updateUser)
server.delete('/delete/:id', deleteUser)
// server.get('/empresa/:userId', getEmpresaByUserId)


module.exports = server;
