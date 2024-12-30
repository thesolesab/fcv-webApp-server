import User from "../../models/User.js"

class UserService {
    getOne(id) {
        if (!id) return 'Id не указан'
        const user = User.findOne({ chatId: id })
            .populate(
                [{ path: 'gameDays' }]
            )
        return user
    }
    update(userData) {
        if (!userData._id) {
            throw new Error('Не указан ID')
        }

        const updatedUser = User.findByIdAndUpdate(userData._id, userData, { new: true })
        return updatedUser
    }
    updateMany(data) {
        if (!data || !data.query || typeof data.query !== 'object') {
            throw new Error('Нет данных')
        }

        const { filter = {}, query, options = {} } = data
        const res = User.updateMany(filter, query, options)
        return res
    }
}

export default new UserService()