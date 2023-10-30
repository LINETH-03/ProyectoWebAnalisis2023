const { Server } = require('socket.io')
let io
exports.socketConnection = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_DOMAIN,
      methods: '*',
    },
  })

  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`)
    socket.join(socket.request._query.id)
    socket.on('disconnect', () => {
      console.info(`Client disconnected [id=${socket.id}]`)
    })
  })
}

exports.sendMessage = (roomId, key, message) => io.to(roomId).emit(key, message)
exports.broadcast = (key, message) => io.sockets.emit(key, message)

exports.getRooms = () => io.sockets.adapter.rooms
