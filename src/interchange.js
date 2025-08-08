const { routes, socket } = require('./present/routes/index')

// ======================================================================== //

const middlewares = {
    ErrorHandler: require('./present/middlewares/ErrorHandler'),
    AuthChecker: require('./present/middlewares/AuthChecker'),
    SocketChecker: require('./present/middlewares/SocketAuth')
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

const handler = async (repositories, helpers, emitSocketEvent) => {
    const users = require('./app/handlers/user/index')
    const socket = require('./app/handlers/socket/index')
    const auth = require('./app/handlers/auth/index')

    return {
        user: await users(repositories, helpers, emitSocketEvent),
        socket: await socket(repositories, helpers, emitSocketEvent),
        auth: await auth(repositories, helpers, emitSocketEvent),
    }
}

// ======================================================================== //

const controller = async (handlers) => {
    const usersController = require('./present/controllers/usersController')
    const socketController = require('./present/controllers/socketController')
    const authController = require('./present/controllers/authController')

    return {
        usersController: await usersController(await handlers.user),
        socketController: await socketController(await handlers),
        authController: await authController(await handlers.auth),
    }
}

// ======================================================================== //

module.exports = { model, repository, handler, controller, middlewares, helpers, routes, socket }