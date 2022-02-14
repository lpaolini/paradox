const {ReplaySubject, Subject} = require('rxjs')
const log = require('./log')

module.exports = () => {
    const tx$ = new Subject()
    const rx$ = new ReplaySubject(10)

    const messages = ['G000N001A001', 'G000N002A001', 'G000N003A001', 'G009N005A001', 'G013N005A001']

    setInterval(() => {
        if (Math.random(0) < .1) {
            rx$.next(messages[Math.floor(Math.random() * messages.length)])
        }
    }, 100)

    tx$.subscribe()

    return {rx$, tx$}
}
