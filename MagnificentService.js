const nodeFetch = require('node-fetch')

const url = "http://localhost:12345"


const hit = async () => {
    return await nodeFetch(url)
}


module.exports = {
    hit
}