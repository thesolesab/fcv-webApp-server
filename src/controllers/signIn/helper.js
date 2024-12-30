import Chat from "../../models/Chat.js"
import GameDay from "../../models/GameDay.js"
import User from "../../models/User.js"
import addNewGameDay from "../../utils/addNewGameDay.js"
import checkUser from "../../utils/checkUser.js"
import getNextDateGame from "../../utils/nextGame.js"

export const checkUserExist = async (ctx) => {
    let chat = await Chat.findOne({ chatId: ctx.message.chat.id })
    let user = await User.findOne({ chatId: ctx.from.id })
    let userExist = false

    checkUser(user, chat)
    const nextGameDate = getNextDateGame(chat.settings.GameDay, chat.settings.gameTime)

    if (chat.gameDays.length === 0) {
        addNewGameDay(chat, nextGameDate, user)
    } else {
        await ctx.deleteMessage()
        const gameDay = await GameDay.findOne(chat.gameDays.at(chat.gameDays.length - 1)).populate([{ path: 'players' }])

        if (gameDay.date !== nextGameDate) {
            addNewGameDay(chat, nextGameDate, user)
        }



        if (!gameDay.players.find(candidate => candidate.chatId === user.chatId)) {
            userExist = true
        }
        console.log(user);

        return { userExist, gameDay, user, chat }
    }
}

export default checkUserExist