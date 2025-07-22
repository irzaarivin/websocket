const socketRoutes = require('./socket-route');
const userRoutes = require('./user-route');

const routes = async (app, controllers, middlewares) => {
  const { usersController } = await controllers

  app.use('/user', await userRoutes(usersController));
  
  app.use(middlewares.ErrorHandler)

  return app;
};

const socket = async (socket, io, controllers) => {
  const { socketController } = await controllers

  await socketRoutes(socket, io, socketController)
};

module.exports = { routes, socket };
