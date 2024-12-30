import { Router } from "express";
import gameController from "./gameController.js";

const gameRouter = new Router()

gameRouter.get('/:id', gameController.getOne)
gameRouter.put('/', gameController.update)

export default gameRouter