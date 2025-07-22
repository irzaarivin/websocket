// SOCKET HANDLERS
const consoleReceived = require('./console')

// BIND ALL HANDLER BY USE CASE
const socket = async (repositories, helpers) => {
    return {
        consoleReceived: await consoleReceived.bind(null, repositories, helpers)
    }
}

module.exports = socket