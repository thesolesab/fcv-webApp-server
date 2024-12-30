import Chat from "../../models/Chat.js"
import GameDay from "../../models/GameDay.js"


class GameService {
    getAll(chatId) {

        const chat = Chat.find({ chatId })
            .populate(
                { path: 'gameDays' }
            )

        return chat
    }

    getOne(id) {
        if (!id) return 'Id не указан'
        const game = GameDay.findById(id)
            .populate(
                [
                    { path: 'legioners', populate: { path: 'whoAdd' } },
                    // { path: 'games', populate: { path: 'teams', populate: { path: 'captain' } } },
                    { path: 'games', populate: { path: 'teams', populate: { path: 'players' } } },
                    { path: 'games', populate: { path: 'winner' } },
                    { path: 'teams' },
                    { path: 'players' },
                    { path: 'whoCreate' }
                ]
            )
        return game
    }

    async update(gameDay) {
        if (!gameDay._id) {
            throw new Error('Не указан ID')
        }

        const updatedGameDay = await GameDay.findByIdAndUpdate(gameDay._id, gameDay, { new: true })
        return updatedGameDay
    }

}

export default new GameService()