import 'dotenv/config';
import mongoose from "mongoose";
import setupBot from "./bot.js"
import express from "express";
import cors from "cors"
import userRouter from './routers/userRouter/userRouter.js';
import gameRouter from './routers/gameRouter/gameRouter.js';
import chatRouter from './routers/chatRouter/chatRouter.js';
import mainRouter from './routers/mainRouter/mainRouter.js';


main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.BD_URI).then(() => console.log('connected to DB success...'))
    // await mongoose.connection.dropDatabase()

    await setupBot().launch()
}


const app = express();
app.use(express.json());
app.use(cors())
app.use('/user', userRouter)
app.use('/game', gameRouter)
app.use('/chat', chatRouter)
app.use('/main', mainRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () =>
    console.log(`Server started on ${PORT}`),
);