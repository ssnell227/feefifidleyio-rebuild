const {addRoom, addUser, removeUser, getUsersInRoom, getRoom, removeRoom, runGame, changeScore } = require('./game')

module.exports = function (io) {
    io.on('connection',  (socket) => {
        socket.on('join', (userObj) => {
            const { username, gameId, spotifyId} = userObj
            socket.join(gameId)
            console.log('joined')
            
            //if room exists, add user to room, else, create room
            if (getRoom(gameId) && getUsersInRoom(gameId).length >=4) {
                io.to(socket.id).emit('tooManyPlayers')
            } else if (getRoom(gameId) && !getRoom(gameId).playing) {
                console.log('adding user', username )
                addUser({gameId, username, socketId: socket.id}, io, socket)
                io.in(gameId).emit('roomData', {room: getRoom(gameId)})
            } else if(getRoom(gameId) && getRoom(gameId).playing ) {
                io.to(socket.id).emit('gameInProgress')
            } else {
                console.log('adding room')
                addRoom(userObj, socket.id, io).then(() => io.in(gameId).emit('roomData', {room: getRoom(gameId), message: 'created'}))
            }

            socket.on('startGame', () => {
                getRoom(gameId).playing = true
                io.in(gameId).emit('begin')
                console.log('startGame triggered')
                runGame(io, gameId)
            })
            
            socket.on('changeScore', (scoreObj) => {
                changeScore(scoreObj)
                io.in(gameId).emit('roomData', {room: getRoom(gameId)})
            })

            // remove user from users array and resend room data to other users in room.  If no users in room, remove the room
            socket.on('leaveRoom', () => {
                removeUser(gameId, socket.id, socket)
                io.in(gameId).emit('roomData', {room: getRoom(gameId)})
                if (!getUsersInRoom(gameId).length) {
                    console.log('leaveRoom ln 40')
                    removeRoom(gameId)
                }
            })
            socket.on('disconnect', () => {
                console.log(gameId)
                removeUser(gameId, socket.id, socket)
                io.in(gameId).emit('roomData', {room: getRoom(gameId)})
                if (!getUsersInRoom(gameId).length) {
                    console.log('disconnect ln 49')
                    removeRoom(gameId)
                }
            })
            //chat feature
            socket.on('sendMessage', (message) => {
                io.in(gameId).emit('newMessage', message)
            })
        })
    })
} 