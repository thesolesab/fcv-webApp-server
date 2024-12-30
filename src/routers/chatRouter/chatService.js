import Chat from "../../models/Chat.js"


class ChatService {
    getSettings(chatId) {
        if (!chatId) {
            throw new Error('Не указан ID')
        }
        const chat = Chat.findOne({ chatId })
            .populate(
                [
                    { path: 'gameDays' },
                    { path: 'users' }
                ]
            )
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