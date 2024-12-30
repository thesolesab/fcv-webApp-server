import { Scenes, Telegraf, session } from "telegraf";
import getMainKeyboard from "./utils/keyboards.js";
import signInOutScene from "./controllers/signIn/index.js";


import startScene from "./controllers/start/index.js";
import { link } from "telegraf/format";


export default function setupBot() {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const stage = new Scenes.Stage([
        startScene,
        signInOutScene
    ])
    const { mainKeyboardSignIn, mainKeyboardSignOut, webApp } = getMainKeyboard()


    bot.use(session())
    bot.use(stage.middleware())

    bot.start(ctx => ctx.scene.enter('start'))
    bot.hears([mainKeyboardSignIn, mainKeyboardSignOut], (ctx) => ctx.scene.enter('signInOut'))
    bot.hears(webApp, ctx => ctx.reply(link('Open App', `https://t.me/Fc_v_bot/fcvbotwapp`)))

    bot.catch(
        (err) => {
            console.log(err);
        }
    )

    return bot
} 