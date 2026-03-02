import MainService from "./mainService.js"


class MainController {
    async getChatById(req, res) {
        try {
            const { chatId } = req.params
            const settings = await MainService.chatById(chatId)
            return res.json(settings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async updateChat(req, res) {
        try {
            const { chatId } = req.params
            const updatedChat = await MainService.updateChat(chatId, req.body)
            return res.json(updatedChat)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default new MainController()