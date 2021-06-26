const { Router } = require("express");
// import all routers;
const empresaRouter = require("./empresaRouter");
const authRouter = require("./authRouter.js");
const userRouter = require('./userRouter')
const loteRouter = require("./loteRouter");
const mercadoPagoRouter = require('./mercadoPagoRouter')
const stockRouter = require('./stockRouter')
const tareaRouter = require('./tareaRouter')
const premiumRouter = require('./premiumRouter')

const router = Router();

router.use("/empresa", empresaRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/lote",loteRouter);
router.use("/premium/checkout",mercadoPagoRouter)
router.use("/stock",stockRouter)
router.use("/tarea", tareaRouter);
router.use('premium', premiumRouter)
module.exports = router;
