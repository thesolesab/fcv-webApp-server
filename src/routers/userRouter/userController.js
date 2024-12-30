import UserService from "./userService.js"


class UserController {
    async getAll(req, res) {
        try {
            const users = UserService.getAll()
            return res.json(users)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const { id } = req.params
            const user = await UserService.getOne(id)
            return res.json(user)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const updatedUser = await UserService.update(req.body)
            return res.json(updatedUser)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async updateMany(req, res) {
        try {
            const updatedUsers = await UserService.updateMany(req.body)
            return res.json(updatedUsers)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()