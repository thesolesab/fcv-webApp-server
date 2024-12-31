const getNextDateGame = (day = 4, time = '17:00') => {
    const now = new Date()

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const res = Math.abs(now.getDay() - 7 - day) > 7 ? Math.abs(now.getDay() - day) : Math.abs(now.getDay() - 7 - day)

    if (now.getDay() != day || now.getDay() === day && now.getHours() > +time.split(':')[0] + 2 && now.getMinutes() > +time.split(':')[1]) {
        now.setDate(now.getDate() + res)
    }

    return now.toLocaleDateString('ru-RU', options)
}

export default getNextDateGame