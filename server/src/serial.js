const {ReplaySubject, Subject} = require('rxjs')
const SerialPort = require('serialport')
const Delimiter = require('@serialport/parser-delimiter')
const log = require('./log')

module.exports = ({port, baudRate}) => {
    const serial = new SerialPort(port, {
        baudRate
    })
    
    const parser = new Delimiter({
        delimiter: '\r'
    })
    
    serial.pipe(parser)
            
    const tx$ = new Subject()
    const rx$ = new ReplaySubject(10)

    // handle opening
    serial.on('open', error => {
        if (error) {
            return log.error('Error opening port: ', error.message)
        }
        log.info('Serial port opened')
    })
 
    // handle errors
    serial.on('error', error => {
        log.error('Error: ', error.message)
        rx$.error(error)
    })

    // TODO: handle close
 
    parser.on('data', buffer =>
        rx$.next(buffer.toString('binary'))
    )

    tx$.subscribe(
        msg => serial.write(msg)
    )

    return {rx$, tx$}
}
