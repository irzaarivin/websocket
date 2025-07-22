module.exports = async (socket, io, socketController) => {
  socket.on("user:login", async (payload) => await socketController.show(socket, io, payload));

  // socket.on("user:login", async (payload) => {
  //   console.log(payload)
  //   try {
  //     const result = await usersController.login(payload);
  //     socket.emit("user:login:success", result);
  //   } catch (err) {
  //     socket.emit("user:login:error", { message: err.message });
  //   }
  // });

  // socket.on("user:update", async (payload) => {
  //   try {
  //     const result = await usersController.update(payload);
  //     io.emit("user:update:success", result);
  //   } catch (err) {
  //     socket.emit("user:update:error", { message: err.message });
  //   }
  // });
};
