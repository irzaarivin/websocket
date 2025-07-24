module.exports = async ({ consoleReceived }) => {
    return {
        show: async (socket, io, payload) => {
            try {
                const data = {
                    payload,
                    userId: socket.id
                }
                await consoleReceived(data);
            } catch (err) {
                socket.emit("user:login:error", { message: err.message });
            }
        }
    }
}