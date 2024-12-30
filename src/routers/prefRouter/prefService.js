import Chat from "../../models/Chat.js"


class PrefService {
    getSettings(chatId) {
        if (!chatId) {
            throw new Error('Не указан ID')
        }
        const settings = Chat.findOne({ chatId })
        return settings
    }

    setSettings(prefData) {
        if (!prefData._id) {
            throw new Error('Не указан ID')
        }

        const updatedSettings = Chat.findByIdAndUpdate(prefData._id, prefData, { new: true })
        return updatedSettings
    }
}

export default new PrefService()