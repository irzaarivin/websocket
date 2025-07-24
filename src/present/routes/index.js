const socketRoutes = require('./socket-route');
const userRoutes = require('./user-route');
const authRoutes = require('./auth-route')

const routes = async (app, controllers, middlewares) => {
  const { usersController, authController } = await controllers
  const { ErrorHandler, AuthChecker } = middlewares
  
  app.use(ErrorHandler)

  app.use('/user', await userRoutes(usersController, AuthChecker));
  app.use('/auth', await authRoutes(authController));

  return app;
};

const socket = async (socket, io, controllers) => {
  const { socketController } = await controllers

  await socketRoutes(socket, io, socketController)
};

module.exports = { routes, socket };
