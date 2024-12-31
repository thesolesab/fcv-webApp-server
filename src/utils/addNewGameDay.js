import GameDay from "../models/GameDay.js"

const addNewGameDay = async (chat, nextGameDate) => {
    const nextGameDay = new GameDay(
        {
            date: nextGameDate,
        }
    )

    chat.gameDays.push(nextGameDay)
    await Promise.all([nextGameDay.save(), chat.save()])
}

export default addNewGameDay