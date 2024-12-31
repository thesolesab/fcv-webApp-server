import GameDay from "../../models/GameDay.js"
import getNextDateGame from "../../utils/nextGame.js"


class GameService {
    getOne(id) {
        if (!id) return 'Id не указан'
        const game = GameDay.findById(id)
            .populate(
                [
                    { path: 'legioners', populate: { path: 'whoAdd' } },
                    { path: 'games', populate: { path: 'teams', populate: { path: 'players' } } },
                    { path: 'games', populate: { path: 'winner' } },
                    { path: 'teams' },
                    { path: 'players' },
                    { path: 'whoCreate' }
                ]
            )
        return game
    }

    update(gameDay) {
        if (!gameDay._id) {
            throw new Error('Не указан ID')
        }

        const updatedGameDay = GameDay.findByIdAndUpdate(gameDay._id, gameDay, { new: true })
        return updatedGameDay
    }
}

export default new GameService()