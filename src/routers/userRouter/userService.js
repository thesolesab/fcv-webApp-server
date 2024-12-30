import User from "../../models/User.js"

class UserService {
    getAll() {
        const users = User.find()
        return users
    }
    getOne(id) {
        if (!id) return 'Id не указан'
        const user = User.findOne({ chatId: id })
            .populate(
                [{ path: 'gameDays' }]
            )
        return user
    }
    async update(userData) {
        if (!userData._id) {
            throw new Error('Не указан ID')
        }

        const updatedUser = await User.findByIdAndUpdate(userData._id, userData, { new: true })
        return updatedUser
    }
}


export default new UserService()