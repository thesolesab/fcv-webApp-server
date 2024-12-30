import { Scenes } from "telegraf"
import getMainKeyboard from "../../utils/keyboards.js";
import checkUserExist from "./helper.js";

const signInOut = new Scenes.BaseScene('signInOut')

signInOut.enter(
    async (ctx) => {
        try {
            if (ctx.message.chat.type === 'private') {
                await ctx.reply('Увы')
                setTimeout(async () => await ctx.reply('Бот работает только в групповых чатах'), 500)
                return await ctx.scene.leave()
            }
            const { mainKeyboardSignIn, mainKeyboardSignOut } = getMainKeyboard()
            const { userExist, gameDay, user, chat } = await checkUserExist(ctx)

            switch (ctx.message.text) {

                case mainKeyboardSignIn:
                    if (userExist) {
                        if (gameDay.players.length >= chat.settings.maxPlayers) {
                            return ctx.reply('Увы, максимум уже набран')
                        }
                        gameDay.players.push(user)
                        Promise.all([gameDay.save(), ctx.reply(`Кайф. ${user.name} записался на игру в ${gameDay.date}`)])
                    } else {
                        await ctx.reply(`Воу полегче, ${user.name}, ты уже записан на игру!`)
                            .then(message => setTimeout(() => ctx.deleteMessage(message.message_id), 15000))
                    }
                    break

                case mainKeyboardSignOut:
                    if (userExist) {
                        await ctx.reply(`${user.name} что за х****? Ты и так не в игре!!`)
                            .then(message => setTimeout(() => ctx.deleteMessage(message.message_id), 15000))
                    } else {
                        gameDay.players = gameDay.players.filter(candidate => candidate.chatId !== user.chatId)
                        Promise.all([gameDay.save(), ctx.reply(`А знаешь, ${user.name}, Я всегда знал что на тебя нельзя положиться. Ты выбыл из игры в ${gameDay.date}`)])
                    }
                    break

                default:
                    return await ctx.reply(`Похоже произошла ошибка, попробуй позже...`)
            }
            await ctx.scene.leave()
        } catch (error) {
            console.log(error);
        }
    }
)

export default signInOut