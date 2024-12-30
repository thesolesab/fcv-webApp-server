import { Scenes } from 'telegraf';
import Chat from '../../models/Chat.js';
import getMainKeyboard from '../../utils/keyboards.js';
import User from '../../models/User.js';
import checkUser from '../../utils/checkUser.js';

const start = new Scenes.BaseScene('start')

start.enter(async (ctx) => {
    try {
        const { mainKeyboard } = getMainKeyboard()
        // let user = await User.findOne({ chatId: ctx.from.id })
        if (ctx.message.chat.type === 'private') {
            await ctx.reply('Для начала добавь меня в группу с сокомандниками')
            return await ctx.scene.leave()
        } else {
            await ctx.deleteMessage()
            let chat = await Chat.findOne({ chatId: ctx.message.chat.id })
            let user = await User.findOne({ chatId: ctx.from.id })

            if (!user) {
                user = new User(
                    {
                        chatId: ctx.from.id,
                        link: `https://t.me/${ctx.from.username}`,
                        name: ctx.from.first_name,
                        username: ctx.from.username,
                        stat: {
                            w: 0,
                            l: 0,
                            d: 0,
                            scores: 0
                        }
                    }
                )
                await user.save()
            }

            if (!chat) {
                chat = new Chat({
                    chatId: ctx.message.chat.id,
                    settings: {
                        gameDay: 4,
                        gameTime: 17,
                        maxPlayers: 15
                    },
                    users: [user]
                })
                await chat.save()
                await ctx.reply(`Стандартные настройки успешно применены. Что делаем дальше?`, mainKeyboard)
            } else {
                await checkUser(user, chat)
                await ctx.reply(`Ваш бот готов служить и подчиняться`, mainKeyboard)
            }
        }

        await ctx.scene.leave()
    } catch (e) {
        console.log(e);

        if (e?.response?.description === "Bad Request: message can't be deleted") {
            await ctx.reply(`Для нормальной работы мне нужны права Администратора!`)
            return await ctx.scene.leave()
        }
    }
})

export default start