import { Markup } from "telegraf"

const WEB_APP_URL = 'ya.ru'

const getMainKeyboard = () => {
    const mainKeyboardProfile = '👤 Профиль'
    const mainKeyboardSignIn = 'Записаться ✍️'
    const mainKeyboardTeamCreate = '👨‍👦‍👦 Команды'
    const webApp = `тест тест тест`
    const setResults = `Результаты 📋`
    const mainKeyboardSignOut = `Выписаться  ❌`

    const mainKeyboard = Markup.keyboard([
        [mainKeyboardSignIn, mainKeyboardSignOut],
        [webApp],
    ]).resize()


    return {
        mainKeyboard,
        mainKeyboardProfile,
        mainKeyboardSignIn,
        mainKeyboardTeamCreate,
        webApp,
        setResults,
        mainKeyboardSignOut
    }

}

export default getMainKeyboard