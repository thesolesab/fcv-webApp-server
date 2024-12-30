import { Router } from "express";
import gameController from "./gameController.js";

const gameRouter = new Router()

gameRouter.get('/all/:chatId', gameController.getAll)
gameRouter.get('/:id', gameController.getOne)
// gameRouter.get('/list', gameController.getMany)
gameRouter.put('/:id', gameController.update)
// gameRouter.delete('/:id', gameController.delete)


export default gameRouter