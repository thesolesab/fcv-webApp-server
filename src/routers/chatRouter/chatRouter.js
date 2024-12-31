import { Router } from "express";
import ChatController from "./chatController.js";
import chatMiddleware from "../../middlewares/chatMiddleware.js";

const chatRouter = new Router()

chatRouter.get('/:chatId', ChatController.getChat)
chatRouter.put('/:id', ChatController.setChat)

export default chatRouter