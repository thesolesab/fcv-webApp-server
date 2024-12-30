import gameService from "./gameService.js"


class GameController {
    async getOne(req, res) {
        try {
            const { id } = req.params
            const game = await gameService.getOne(id)
            return res.json(game)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedUser = await gameService.update(req.body)
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new GameController()