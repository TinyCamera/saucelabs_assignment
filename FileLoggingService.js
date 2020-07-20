const fs = require('fs');

const log = (message) => {
    fs.appendFile("log.txt", message + '\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = {
    log
}