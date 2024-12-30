import PrefService from "./prefService.js"


class PrefController {
    async getSettings(req, res) {
        try {
            const { chatId } = req.params
            const settings = await PrefService.getSettings(chatId)
            return res.json(settings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async setSettings(req, res) {
        try {
            const updatedSettings = await PrefService.setSettings(req.body)
            return res.json(updatedSettings)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default new PrefController()