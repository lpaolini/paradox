const getArea = area => {
    if (area === '000') return 'All Areas'
    if (area === '255') return 'At Least One Area'
    return `Area ${parseInt(area)}`
}

const withArea = (msg, area) => `${msg} (${getArea(area)})`

const nonReportableEvent = (n, a) => {
    const events = {
        '000': a => withArea('TLM Trouble', a),
        '001': a => withArea('Smoke detector reset', a),
        '002': a => withArea('Arm with no entry delay', a),
        '003': a => withArea('Arm in Stay mode', a),
        '004': a => withArea('Arm in Away mode', a),
        '005': a => withArea('Full arm when in Stay mode', a),
        '006': a => withArea('Voice module access', a),
        '007': a => withArea('Remote control access', a),
        '008': a => withArea('PC Fail to communicate', a),
        '009': a => withArea('Midnight', a),
        '010': a => withArea('NEware User Login', a),
        '011': a => withArea('NEware User Logout', a),
        '012': a => withArea('User Initiated Callup', a),
        '013': a => withArea('Force Answer', a),
        '014': a => withArea('Force Hangup', a),
    }
    return events[n](a)
}

const bypassProgrammingAccess = (n, a) => {
    return n === '000'
        ? withArea('One-touch Bypass Programming', a)
        : withArea(`Bypass Programming Access code ${n}`, a)
}

const specialArming = (n, a) => {
    const events = {
        '000': a => withArea(`Auto Arming`, a),
        '001': a => withArea(`Arming by WinLoad`, a),
        '002': a => withArea(`Late to Close`, a),
        '003': a => withArea(`No Movement Arming`, a),
        '004': a => withArea(`Partial Arming`, a),
        '005': a => withArea(`One-touch Arming`, a),
        '006': a => withArea(`Future Use`, a),
        '007': a => withArea(`Future Use`, a),
        '008': a => withArea(`(InTouch) Voice Module Arming`, a),
    }
    return events[n](a)
}

const specialDisarming = (n, a) => {
    const events = {
        '000': a => withArea(`Auto Arm Cancelled`, a),
        '001': a => withArea(`One-touch Stay/Instant Disarm`, a),
        '002': a => withArea(`Disarming with WinLoad`, a),
        '003': a => withArea(`Disarming with WinLoad after alarm`, a),
        '004': a => withArea(`WinLoad cancelled alarm`, a),
        '005': a => withArea(`Future Use`, a),
        '006': a => withArea(`Future Use`, a),
        '007': a => withArea(`Future Use`, a),
        '008': a => withArea(`(InTouch) Voice Module Disarming`, a),
    }
    return events[n](a)
}

const specialAlarm = (n, a) => {
    const events = {
        '000': a => withArea(`Special Alarm: Emergency Panic (Keys 1 & 3)`, a),
        '001': a => withArea(`Special Alarm: Medical Panic (Keys 4 & 6)`, a),
        '002': a => withArea(`Special Alarm: Fire Panic (Keys 7 & 9)`, a),
        '003': a => withArea(`Special Alarm: Recent Closing`, a),
        '004': a => withArea(`Special Alarm: Police Code`, a),
        '005': a => withArea(`Special Alarm: Global Shutdown`, a),
    }
    return events[n](a)
}

const panelTrouble = (type, n, a) => {
    const events = {
        '000': a => withArea(`Panel ${type}: TLM Trouble`, a),
        '001': a => withArea(`Panel ${type}: AC Failure`, a),
        '002': a => withArea(`Panel ${type}: Battery Failure`, a),
        '003': a => withArea(`Panel ${type}: Auxiliary Current Limit`, a),
        '004': a => withArea(`Panel ${type}: Bell Current Limit`, a),
        '005': a => withArea(`Panel ${type}: Bell Absent`, a),
        '006': a => withArea(`Panel ${type}: Clock Trouble`, a),
        '007': a => withArea(`Panel ${type}: Global Fire Loop`, a),
    }
    return events[n](a)
}

const module = (type, n, a) => {
    const events = {
        '000': a => withArea(`Module ${type}: Combus Fault`, a),
        '001': a => withArea(`Module ${type}: Module Tamper`, a),
        '002': a => withArea(`Module ${type}: ROM/RAM error`, a),
        '003': a => withArea(`Module ${type}: TLM Trouble`, a),
        '004': a => withArea(`Module ${type}: Fail to Communicate`, a),
        '005': a => withArea(`Module ${type}: Printer Fault`, a),
        '006': a => withArea(`Module ${type}: AC Failure`, a),
        '007': a => withArea(`Module ${type}: Battery Failure`, a),
        '008': a => withArea(`Module ${type}: Auxiliary Failure`, a),
    }
    return events[n](a)
}

const specialEvent = (n, a) => {
    const events = {
        '000': a => withArea('Power up after total power down', a),
        '001': a => withArea('Software reset (Watchdog)', a),
        '002': a => withArea('Test Report', a),
        '003': a => withArea('Future Use', a),
        '004': a => withArea('WinLoad In (connected)', a),
        '005': a => withArea('WinLoad Out (disconnected)', a),
        '006': a => withArea('Installer in programming', a),
        '007': a => withArea('Installer out of programming', a),
    }
    return events[n](a)
}

const newModule = (n, a) => {
    return n === '000'
        ? `New Module Assigned on Combus: ${a}`
        : `New Module Assigned on Combus: Any Module`
}

const status1 = (n, a) => {
    const events = {
        '000': withArea('Armed', a),
        '001': withArea('Force Armed', a),
        '002': withArea('Stay Armed', a),
        '003': withArea('Instant Armed', a),
        '004': withArea('Strobe Alarm', a),
        '005': withArea('Silent Alarm', a),
        '006': withArea('Audible Alarm', a),
        '007': withArea('Fire Alarm', a),
    }
    return events[n](a)
}

const status2 = (n, a) => {
    const events = {
        '000': withArea('Ready', a),
        '001': withArea('Exit Delay', a),
        '002': withArea('Entry Delay', a),
        '003': withArea('System in Trouble', a),
        '004': withArea('Alarm in Memory', a),
        '005': withArea('Zones Bypassed', a),
        '006': withArea('Bypass, Master, Installer Programming', a),
        '007': withArea('Keypad Lockout', a),
    }
    return events[n](a)
}

const status3 = (n, a) => {
    const events = {
        '000': withArea('Intellizone Delay Engaged', a),
        '001': withArea('Fire Delay Engaged', a),
        '002': withArea('Auto Arm', a),
        '003': withArea('Arming with Voice Module (set until Exit Delay finishes)', a),
        '004': withArea('Tamper', a),
        '005': withArea('Zone Low Battery', a),
        '006': withArea('Fire Loop Trouble', a),
        '007': withArea('Zone Supervision Trouble', a),
    }
    return events[n](a)
}

const getEvent = (g, n, a) => {
    const events = {
        '000': (n, a) => withArea(`Zone is OK ${n}`, a),
        '001': (n, a) => withArea(`Zone is open ${n}`, a),
        '002': (n, a) => withArea(`Zone is tampered ${n}`, a),
        '003': (n, a) => withArea(`Zone is in fire loop trouble ${n}`, a),
        '004': (n, a) => nonReportableEvent(n, a),
        '005': (n, a) => withArea(`User Code entered on Keypad ${n}`, a),
        '006': (n, a) => withArea(`User/Card Access on door ${n}`, a),
        '007': (n, a) => bypassProgrammingAccess(n, a),
        '008': (n, a) => withArea(`TX Delay Zone Alarm zone ${n}`, a),
        '009': (n, a) => withArea(`Arming with Master Code ${n}`, a),
        '010': (n, a) => withArea(`Arming with User Code ${n}`, a),
        '011': (n, a) => withArea(`Arming with Keyswitch ${n}`, a),
        '012': (n, a) => specialArming(n, a),
        '013': (n, a) => withArea(`Disarm with Master Code ${n}`, a),
        '014': (n, a) => withArea(`Disarm with User Code ${n}`, a),
        '015': (n, a) => withArea(`Disarm with Keyswitch ${n}`, a),
        '016': (n, a) => withArea(`Disarm after alarm with Master Code ${n}`, a),
        '017': (n, a) => withArea(`Disarm after alarm with User Code ${n}`, a),
        '018': (n, a) => withArea(`Disarm after alarm with Keyswitch ${n}`, a),
        '019': (n, a) => withArea(`Alarm Cancelled with Master Code ${n}`, a),
        '020': (n, a) => withArea(`Alarm Cancelled with User Code ${n}`, a),
        '021': (n, a) => withArea(`Alarm Cancelled with Keyswitch ${n}`, a),
        '022': (n, a) => specialDisarming(n, a),
        '023': (n, a) => withArea(`Zone bypassed ${n}`, a),
        '024': (n, a) => withArea(`Zone in alarm ${n}`, a),
        '025': (n, a) => withArea(`Fire alarm ${n}`, a),
        '026': (n, a) => withArea(`Zone Alarm Restore ${n}`, a),
        '027': (n, a) => withArea(`Fire Alarm Restore ${n}`, a),
        '028': (n, a) => withArea(`Early to Disarm by User ${n}`, a),
        '029': (n, a) => withArea(`Late to Disarm by User ${n}`, a),
        '030': (n, a) => specialAlarm(n, a),
        '031': (n, a) => withArea(`Duress Alarm by User ${n}`, a),
        '032': (n, a) => withArea(`Zone Shutdown ${n}`, a),
        '033': (n, a) => withArea(`Zone Tamper ${n}`, a),
        '034': (n, a) => withArea(`Zone Tamper Restore ${n}`, a),
        '035': (_, a) => withArea(`Keypad Lockout`, a),
        '036': (n, a) => panelTrouble('Event', n, a),
        '037': (n, a) => panelTrouble('Restore', n, a),
        '038': (n, a) => moduleTrouble('Event', n, a),
        '039': (n, a) => moduleTrouble('Restore', n, a),
        '040': (n, a) => withArea(`Fail to Communicate on telephone Number ${n}`, a),
        '041': (n, a) => withArea(`Low Battery on Zone ${n}`, a),
        '042': (n, a) => withArea(`Zone Supervision Trouble ${n}`, a),
        '043': (n, a) => withArea(`Low Battery on Zone Restored ${n}`, a),
        '044': (n, a) => withArea(`Zone Supervision Trouble Restored ${n}`, a),
        '045': (n, a) => specialEvent(n, a),
        '046': (n, a) => withArea(`Early to Arm by User ${n}`, a),
        '047': (n, a) => withArea(`Late to Arm by User ${n}`, a),
        '048': (n, a) => withArea(`Utility Key ${n}`, a),
        '049': (n, a) => withArea(`Request for Exit ${n}`, a),
        '050': (n, a) => withArea(`Access Denied ${n}`, a),
        '051': (n, a) => withArea(`Door Left Open Alarm ${n}`, a),
        '052': (n, a) => withArea(`Door Forced Alarm ${n}`, a),
        '053': (n, a) => withArea(`Door Left Open Restore ${n}`, a),
        '054': (n, a) => withArea(`Door Forced Open Restore ${n}`, a),
        '055': (n, a) => withArea(`Intellizone Triggered ${n}`, a),
        '058': (n, a) => newModule(n, a),
        '060': () => 'Future Use',
        '061': () => 'Future Use',
        '062': (n, a) => withArea(`Access Granted to User ${n}`, a),
        '063': (n, a) => withArea(`Access Denied to User ${n}`, a),
        '064': (n, a) => status1(n, a),
        '065': (n, a) => status2(n, a),
        '066': (n, a) => status3(n, a),
    }
    return events[g](n, a)
}

export const parseMessage = message => {
    if (message.substr(0, 1) === 'G') {
        const g = message.substr(1, 3)
        const n = message.substr(5, 3)
        const a = message.substr(9, 3)
        return getEvent(g, n, a)
    }
    if (message.substr(0, 2) === 'RA') {
        const area = message.substr(2, 3)
        const status = message.substr(5, 1) // DAFSI
        const memory = message.substr(6, 1) === 'M'
        const trouble = message.substr(7, 1) === 'T'
        const notReady = message.substr(8, 1) === 'N'
        const programming = message.substr(9, 1) === 'P'
        const alarm = message.substr(10, 1) === 'A'
        const strobe = message.substr(11, 1) === 'S'
        return getAreaStatus({area, status, memory, trouble, notReady, programming, alarm, strobe})
    }
    if (message.substr(0, 2) === 'RZ') {
        const zone = message.substr(2, 3)
        const status = message.substr(5, 1) // COTF
        const alarm = message.substr(6, 1) === 'A'
        const fire = message.substr(7, 1) === 'F'
        const supervisionLost = message.substr(8, 1) === 'S'
        const lowBattery = message.substr(9, 1) === 'L'
        return getZoneStatus({zone, status, alarm, fire, supervisionLost, lowBattery})
    }
    if (message.substr(0, 2) === 'ZL') {
        const zone = message.substr(2, 3)
        const label = message.substr(5, 16)
        return getZoneLabel({zone, label})
    }
    if (message.substr(0, 2) === 'AL') {
        const area = message.substr(2, 3)
        const label = message.substr(5, 16)
        return getAreaLabel({area, label})
    }
    if (message.substr(0, 2) === 'UL') {
        const user = message.substr(2, 3)
        const label = message.substr(5, 16)
        return getUserLabel({user, label})
    }
}
