const _ = require('lodash')

// EVO192
// const MAX_ZONE = 192
// const MAX_USER = 999
// const MAX_AREA = 8

// DGP-848
const MAX_ZONE = 48
const MAX_USER = 96
const MAX_AREA = 4

const MAX_KEY = 251

const validate = (name, value, min, max) => {
    if (_.isNumber(value) && value >= min && value <= max) {
        return String(value).padStart(3, '0')
    }
    throw new Error(`Invalid ${name} ${value} (min: ${min}, max: ${max})`)
}

const validateInput = input => validate('input', input, 1, 16)
const validateArea = area => validate('area', area, 1, MAX_AREA)
const validateZone = zone => validate('zone', zone, 1, MAX_ZONE)
const validateUser = user => validate('user', user, 1, MAX_USER)
const validateKey = user => validate('user', user, 1, MAX_KEY)

const validateArmMode = armMode => {
    if (armMode && armMode.lenght === 1 && 'AFSI'.includes(armMode)) {
        return armMode
    }
    throw new Error(`Invalid mode ${armMode} (A, F, S, I)`)
}

const validateCode = code => {
    if (code && code.lenght >= 4 && code.lenght <= 6) {
        return code
    }
    throw new Error(`Invalid code ${code} (4-6 char)`)
}

const commands = {
    'virtualInputOpen': input => `VO${validateInput(input)}`,
    'virtualInputClose': input => `VC${validateInput(input)}`,
    'requestAreaStatus': area => `RA${validateArea(area)}`,
    'requestZoneStatus': zone => `RZ${validateZone(zone)}`,
    'requestAreaLabel': area => `AL${validateArea(area)}`,
    'requestZoneLabel': zone => `ZL${validateZone(zone)}`,
    'requestUserLabel': user => `UL${validateUser(user)}`,
    'areaArm': (area, armMode, code) => `AA${validateArea(area)}${validateArmMode(armMode)}${validateCode(code)}`,
    'areaQuickArm': (area, armMode) => `AQ${validateArea(area)}${validateArmMode(armMode)}`,
    'areaDisarm': (area, code) => `AD${validateArea(area)}${code}`,
    'emergencyPanic': area => `PE${validateArea(area)}`,
    'medicalPanic': area => `PM${validateArea(area)}`,
    'firePanic': area => `PF${validateArea(area)}`,
    'smokeReset': area => `SR${validateArea(area)}`,
    'utilityKey': key => `UK${validateKey(key)}`,
}
