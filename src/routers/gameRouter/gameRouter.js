import { Router } from "express";
import GameController from "./gameController.js";
import gameMiddleware from "../../middlewares/gameMiddleware.js";

const gameRouter = new Router()

gameRouter.get('/:id', GameController.getOne)
gameRouter.put('/update', gameMiddleware, GameController.update)


export default gameRouter