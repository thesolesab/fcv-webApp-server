import GameDay from "../models/GameDay.js"

const addNewGameDay = async (chat, nextGameDate, user) => {
    const nextGameDay = new GameDay(
        {
            date: nextGameDate,
            players: [user]
        }
    )

    chat.gameDays.push(nextGameDay)
    await Promise.all([nextGameDay.save(), chat.save()])
}

export default addNewGameDay