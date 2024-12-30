import ChatService from "./chatService.js"


class ChatController {
    async getChat(req, res) {
        try {
            const { chatId } = req.params
            const settings = await ChatService.getSettings(chatId)
            return res.json(settings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async setChat(req, res) {
        try {
            const updatedSettings = await ChatService.setSettings(req.body)
            return res.json(updatedSettings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default new ChatController()