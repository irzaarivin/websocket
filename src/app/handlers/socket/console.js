const consolel = async (repositories, helpers, emitSocketEvent, data) => {
   // console.log(emitSocketEvent)
   emitSocketEvent('user:login', data, data.userId)
   // console.log(data)
}

module.exports = consolel