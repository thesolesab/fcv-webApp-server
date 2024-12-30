import { Router } from "express";
import PrefController from "./prefController.js";

const prefRouter = new Router()

prefRouter.get('/:chatId', PrefController.getSettings)
prefRouter.put('/:id', PrefController.setSettings)

export default prefRouter