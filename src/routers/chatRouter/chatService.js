import Chat from "../../models/Chat.js"
import addNewGameDay from "../../utils/addNewGameDay.js";
import getNextDateGame from "../../utils/nextGame.js"


class ChatService {
    async getSettings(chatId) {
        if (!chatId) {
            throw new Error('Не указан ID')
        }
        const chat = await Chat.findOne({ chatId })
            .populate(
                [
                    { path: 'gameDays' },
                    { path: 'users' }
                ]
            )

        const nextGameDate = getNextDateGame(chat.settings.gameDay, chat.settings.gameTime)

        if (chat.gameDays.length === 0 || chat.gameDays.at(-1).date !== nextGameDate) {
            addNewGameDay(chat, nextGameDate)
            console.log(chat);

        }

        return chat
    }

    setSettings(chatData) {
        if (!chatData._id) {
            throw new Error('Не указан ID')
        }

        const updatedSettings = Chat.findByIdAndUpdate(chatData._id, chatData, { new: true })
        return updatedSettings
    }
}

export default new ChatService()