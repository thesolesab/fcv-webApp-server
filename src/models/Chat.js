import mongoose, { Schema } from "mongoose";

const newSessionSchema = new Schema(
    {
        chatId: Number,
        settings: {
            gameDay: Number,
            gameTime: String,
            maxPlayers: Number
        },
        users: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        ],
        gameDays: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'GameDay'
            }
        ]
    }
)

const Chat = mongoose.model('Chat', newSessionSchema)

export default Chat