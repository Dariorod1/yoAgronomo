const { Post, Empresa,User } = require('../db');
const bcrypt = require('bcrypt');
const authConfig = require('../config');



//==================================================//

const getEmpresaByUserId = (req, res) => {
  const { userId } = req.params;
  Order.findAll({
    where: {
      id: userId,
    },
    include: [
      {
        model: Empresa,
      },
    ],
  })
    .then((empresa) => {
      console.log(" estoy aqui--------", empresa);
      res.json({ message: "Empresa encontrada" }).status(200);
    })
    .catch((err) => {
      res.send({ message: err }).status(400);
    });
};
const updateUser = async(req,res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;  
 
  let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

  let userFind = await User.findAll({
      where: {
          id
      }
  })
   
  if (req.file) {
    var profile = req.file.filename;
  }

  if (userFind.length > 0) {
      userFind.map(async user => {
          await user.update({
              fullName,
              email,
              password,
              profile_pic: profile
          });
      });
      return res.json({
          message: "User updated",
          date: userFind
      })
  }
}

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((deleteUser) => deleteUser.destroy())
    .then((deleteUser) => res.send("Usuario eliminado con exito"))
    .catch((err) => res.send(err));
};

module.exports = {

  getEmpresaByUserId,
  updateUser,
  deleteUser
};
