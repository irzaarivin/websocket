const { routes, socket } = require('./present/routes/index')

// ======================================================================== //

const middlewares = {
    ErrorHandler: require('./present/middlewares/ErrorHandler')
}

const helpers = {
    email: require('./app/helpers/email')
}

// ======================================================================== //

const model = async (Sequelize, sequelize, mongoose) => {
    const User = require('./domain/models/User')

    return {
        User: await User(Sequelize, sequelize)
    }
}

// ======================================================================== //

const repository = async (models) => {
    const userRepositories = require('./domain/repositories/userRepositories')

    return {
        userRepositories: await userRepositories(models),
    }
}

// ======================================================================== //

const handler = async (repositories, helpers) => {
    const users = require('./app/handlers/user/index')
    const socket = require('./app/handlers/socket/index')

    return {
        user: await users(repositories, helpers),
        socket: await socket(repositories, helpers)
    }
}

// ======================================================================== //

const controller = async (handlers) => {
    const usersController = require('./present/controllers/usersController')
    const socketController = require('./present/controllers/socketController')

    return {
        usersController: await usersController(await handlers.user),
        socketController: await socketController(await handlers.socket),
    }
}

// ======================================================================== //

module.exports = { model, repository, handler, controller, middlewares, helpers, routes, socket }