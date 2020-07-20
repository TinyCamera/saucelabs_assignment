const MagnificentService = require("./MagnificentService.js")
const MetricsService = require("./MetricsService.js")
const FileLogginService = require("./FileLoggingService.js")
const main = async () => {

    try {
        const resp = await MagnificentService.hit()
        MetricsService.addResult(await resp.text(), resp.status)
    } catch (e) {
        MetricsService.addError("Connection error.")
    }

    const message = MetricsService.getMessage()
    console.log(message)
    FileLogginService.log(message)
}

setInterval(main, 1000)