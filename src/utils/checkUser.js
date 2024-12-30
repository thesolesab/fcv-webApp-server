async function checkUser(user, chat) {

    await chat.populate([
        { path: 'users' }
    ])

    if (!chat.users.find(candidate => candidate.chatId === user.chatId)) {
        chat.users.push(user)
        await chat.save()
    }
}

export default checkUser