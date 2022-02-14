const path = require('path')
const config = require('./config')
const SerialDummy = require('./serialDummy')
const Serial = require('./serial')
const Server = require('./server')
const log = require('./log')

const serial = config.serial.dummy
    ? SerialDummy()
    : Serial({
        port: config.serial.port,
        baudRate: config.serial.baudRate
    })

const server = Server({
    port: config.server.port,
    ssl: {
        key: path.join(__dirname, '..', config.server.ssl.key),
        cert: path.join(__dirname, '..', config.server.ssl.cert)
    }
})

serial.rx$.subscribe({
    next: msg => {
        log.debug(`Server message: ${msg}`)
        server.tx$.next({timestamp: new Date(), msg})
    },
    error: error => log.error('Serial error:', error),
    // complete: () => log.error('Serial port closed')
})

server.rx$.subscribe({
    next: msg => {
        log.debug(`Client message: ${msg}`)
        serial.tx$.next(msg)
    },
    error: error => log.error('Client error:', error),
    // complete: () => log.error('Server socket closed')
})
