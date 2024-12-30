import { Router } from "express";
import userController from "./userController.js";

const userRouter = new Router()

userRouter.get('/all', userController.getAll)
userRouter.get('/:id', userController.getOne)
userRouter.put('/:id', userController.update)
userRouter.put('/updateMany', userController.updateMany)


export default userRouter