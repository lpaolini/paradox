const fs = require('fs')
const https = require('https')
const express = require('express')
const path = require('path')
const WebSocket = require('ws')
const {ReplaySubject, Subject} = require('rxjs')
const log = require('./log')

module.exports = ({port, ssl}) => {
    const app = express()

    // app.use(express.static(path.join(__dirname, './static')))
    app.use(express.static(path.join(__dirname, '../../client/dist')))
    
    app.get('/', function(req, res) {
        res.render('index.html')
    })

    const tx$ = new ReplaySubject(10)
    const rx$ = new Subject()
    
    const sslCredentials = {
        key: fs.readFileSync(ssl.key || __dirname + '/localhost.crt'),
        cert: fs.readFileSync(ssl.cert || __dirname + '/localhost.key')
    }
    
    const server = https.createServer(sslCredentials, app)
    const wss = new WebSocket.Server({server})
    
    server.listen(port, () => {
        log.info(`Server started on port ${port}`)
    })

    wss.on('connection', ws => {
        log.info('Connection established')
        ws.on('close', () => log.info('Connection closed'))
        ws.on('message', msg => {
            log.info('Received message:', msg)
            rx$.next(msg.toString('utf-8'))
        })
    })

    tx$.subscribe(
        msg => {
            wss.clients.forEach(function (client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({msg}))
                }
            })
        }
    )
    
    return {rx$, tx$}
}
