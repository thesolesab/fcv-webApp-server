import 'dotenv/config';
import mongoose from "mongoose";
import setupBot from "./bot.js"
import express from "express";
import cors from "cors"
import userRouter from './routers/userRouter/userRouter.js';
import gameRouter from './routers/gameRouter/gameRouter.js';
import prefRouter from './routers/prefRouter/prefRouter.js';


main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.BD_URI).then(() => console.log('connected to DB succes...'))
    // await mongoose.connection.dropDatabase()

    await setupBot().launch()
}


const app = express();
app.use(express.json());
app.use(cors())
app.use('/user', userRouter)
app.use('/game', gameRouter)
app.use('/pref', prefRouter)

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);