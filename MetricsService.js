const moment = require('moment')
const MAX_WINDOW_SIZE = 100
const slidingWindow = []

const addResult = (text, statuCode) => {
    slidingWindow.push({
        timestamp: Date.now(),
        text,
        statuCode
    })

    if (slidingWindow.length > MAX_WINDOW_SIZE) {
        slidingWindow.pop()
    }
}

const addError = (error) => {
    slidingWindow.push({
        timestamp: Date.now(),
        text: error,
        statuCode: 500
    })

    if (slidingWindow.length > MAX_WINDOW_SIZE) {
        slidingWindow.pop()
    }
}

const getHealthStatus = () => {
    const failureCount = getFailures().length

    if (failureCount === slidingWindow.length) {
        return "RED"
    } else if (failureCount > 0) {
        return "AMBER"
    } else {
        return "GREEN"
    }
}

const getTimeWindow = () => {
    const oldestResult = slidingWindow[0]
    const timestamp = oldestResult.timestamp
    return moment(Date.now() - timestamp)
}

const getFailures = () => slidingWindow.filter(item => item.statuCode !== 200)

const getPercentageFailures = () => {
    const failures = getFailures()
    const failureCount = failures.length

    return Math.floor((failureCount / slidingWindow.length) * 100)
}

const getTopFailures = () => {
    const failures = getFailures()

    const map = new Map()
    for (const failure of failures) {
        if (map.has(failure.text)) {
            map.set(failure.text, map.get(failure.text) + 1)
        } else {
            map.set(failure.text, 1)
        }
    }

    const entries = Array.from(map.entries())
    return entries.sort(sortDesending)
}

const getMessage = () => {
    const dateString = moment().format("")
    let message = `[${dateString}] HEALTH STATUS: ${getHealthStatus()} - ${getPercentageFailures()}% requests failed. (Last ${slidingWindow.length} requests).`

    const topFailures = getTopFailures()
    if (topFailures.length > 0) {
        message += ` Top Failure: ${topFailures[0][0]}`
    }

    return message
}

const sortDesending = ([aKey, aValue], [bKey, bValue]) => bValue - aValue

module.exports = {
    addResult,
    getPercentageFailures,
    getTopFailures,
    getMessage,
    addError
}