import { Router } from "express";
import gameController from "./gameController.js";
import gameMiddleware from "../../middlewares/gameMiddleware.js";

const gameRouter = new Router()

gameRouter.get('/:id', gameController.getOne)
gameRouter.put('/update', gameMiddleware, gameController.update)


export default gameRouter