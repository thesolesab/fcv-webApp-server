import { Router } from "express";
import MainController from "./mainController.js";


const mainRouter = new Router()

mainRouter.get('/:chatId', MainController.getChatById)
mainRouter.put('/:chatId', MainController.updateChat)

export default mainRouter