function gameMiddleware(req, res, next) {
    for (let i = 0; i < req.body.teams.length; i++) {
        req.body.teams[i].stat = {
            w: 0, l: 0, d: 0, p: 0
        }
    }
    req.body.games.forEach(game => {
        if (game.score[0] !== game.score[1]) {
            const max = Math.max(...game.score)
            const winnerId = game.teams[game.score.findIndex(el => el === max)]
            const looserId = game.teams[game.score.findIndex(el => el !== max)]
            const winnerTeam = req.body.teams.find(el => el._id === winnerId)
            const looserTeam = req.body.teams.find(el => el._id === looserId)

            winnerTeam.stat.w += 1
            looserTeam.stat.l += 1
        } else {
            for (const id of game.teams) {
                const team = req.body.teams.find(el => el._id === id)
                team.stat.d += 1
            }
        }
    });

    for (const team of req.body.teams) {
        team.stat.p = team.stat.w * 3 + team.stat.d
    }

    next()
}

export default gameMiddleware
