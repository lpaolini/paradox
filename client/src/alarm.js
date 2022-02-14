import $ from 'jquery'
import {mergeMap, of, pipe, range, retryWhen, switchMap, switchMapTo, tap, throwError, timer, zip} from 'rxjs'
import {webSocket} from 'rxjs/webSocket'
import {parseMessage} from './prt3-events'

// const retry = (maxRetries, {minDelay = 500, maxDelay = 30000, exponentiality = 2, description} = {}) => pipe(
//     retryWhen(error$ =>
//         zip(
//             error$,
//             range(1, maxRetries + 1)
//         ).pipe(
//             mergeMap(
//                 ([error, retry]) => {
//                     if (retry > maxRetries) {
//                         return throwError(error)
//                     } else {
//                         const exponentialBackoff = Math.pow(exponentiality, retry) * minDelay
//                         const cappedExponentialBackoff = Math.min(exponentialBackoff, maxDelay)
//                         console.error(`Retrying ${description ? `${description} ` : ''}(${retry}/${maxRetries}) in ${cappedExponentialBackoff}ms after error: ${error}`)
//                         return timer(cappedExponentialBackoff)
//                     }
//                 }
//             )
//         )
//     )
// )

const WebSocketClient = (url, {onOnline, onOffline, onMessage}) => {
    const webSocket$ = of(true).pipe(
        switchMap(() => {
            const webSocket$ = webSocket(url)
            
            return webSocket$
        }),
    )
    webSocket$.pipe(
        retryWhen(errors$ =>
            errors$.pipe(
                mergeMap(error => {
                    console.log(`Error:`, error)
                    return timer(1000)
                })
            )
        )
    ).subscribe({
        next: ({msg}) => {
            console.log('message received: ', msg)
            onMessage && onMessage(msg)
        },
        error: err => console.log(err),
        complete: () => console.log('complete')
    })

    return {
        sendCommand: msg => {
            console.log('sending message: ', msg)
            webSocket$.next(msg)
        }
    }

    // subject.next({message: 'some message'})
    // subject.complete()
    // subject.error({code: 4000, reason: 'I think our app just broke!'})
}

$(() => {
    console.log('Ready')

    const url = 'wss://' + location.hostname + ':' + location.port

    const connection = WebSocketClient(url, {
        onOnline: () => console.log('online'),
        onOffline: () => console.log('offline'),
        onMessage: msg => {
            const item = $('<li>').append(parseMessage(msg))
            $('ul.log').append(item)
        }
    })

    connection.sendCommand('RA001')
})
