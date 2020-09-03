require('dotenv').config()
const { LOCAL_HOST, SERVER_PORT } = process.env
const axios = require('axios')
const CronJob = require('cron').CronJob

const rooms = []

const rounds = 5;
const dummySongs = 3
const getReadySeconds = 5
const gameSeconds = 10

const getRandomSong = (tracksArray) => {
    let randomIndex = Math.floor(Math.random() * tracksArray.length - 1)
    return tracksArray.splice(randomIndex, 1)
}

const calculateWinner = (userArray) => {
    return userArray.sort((a, b) => b.score - a.score)[0]
}

const runGame = async (io, gameId) => {

    const currentRoom = getRoom(gameId)
    currentRoom.counter = getReadySeconds


    const getReadyTimer = new CronJob('*/1 * * * * *', () => {
        if (!getUsersInRoom(gameId)) {
            return getReadyTimer.stop()
        } else if (currentRoom.counter > 0) {
            io.in(gameId).emit('timerDecrement', { seconds: currentRoom.counter })
            currentRoom.counter--
        } else if (currentRoom.counter <= 0) {
            getReadyTimer.stop()
            io.in(gameId).emit('switchMode', { currentRound: currentRoom.currentRound, roomPlaying: true })
            currentRoom.counter = gameSeconds
            io.in(gameId).emit('nextRound')
            io.in(gameId).emit('timerDecrement', { seconds: currentRoom.counter })
            currentRoom.counter--
            gamePlayTimer.start()
        }
    })

    const gamePlayTimer = new CronJob('*/1 * * * * *', async () => {
        if (!getUsersInRoom(gameId)) {
            return gamePlayTimer.stop()
        } else if (currentRoom.counter > 0) {
            io.in(gameId).emit('timerDecrement', { seconds: currentRoom.counter })
            currentRoom.counter--
        } else if (currentRoom.currentRound >= rounds) {
            gamePlayTimer.stop()
            const winner = calculateWinner(currentRoom.users)
            io.in(gameId).emit('gameOver', { winner })

            //reset stuff after game is over to allow play again
            currentRoom.playing = false
            currentRoom.currentRound = 1
            currentRoom.counter = 0
            currentRoom.users.forEach(user => user.score = 0)
            currentRoom.gameObjs = await getGameSongs(currentRoom.spotifyId)
            io.in(gameId).emit('sendSongs', { songs: currentRoom.gameObjs })
            io.in(gameId).emit('roomData', {room: currentRoom})
            return

        } else if (currentRoom.counter <= 0) {
            gamePlayTimer.stop()
            currentRoom.currentRound++
            currentRoom.counter = getReadySeconds

            io.in(gameId).emit('switchMode', { currentRound: currentRoom.currentRound, roomPlaying: false })
            io.in(gameId).emit('timerDecrement', { seconds: currentRoom.counter })
            currentRoom.counter--
            getReadyTimer.start()
        }
    })
    getReadyTimer.start()

}

const changeScore = ({ gameId, socketId, date }) => {

    const users = getUsersInRoom(gameId)

    const user = users.find(user => user.socketId === socketId)

    user.score += 1 + 1 / (date % 100000)


    //create better way to keep track of score here
    // if (!user.score.includes(correctSong)) {
    //     user.score.push({ correctSong, date })
    // }
}

//room functions

const getRoom = (gameId) => {
    return rooms.find(item => item.gameId === gameId)
}

const getGameSongs = async (spotifyId) => {
    

    const { data } = await axios.post(`http://${LOCAL_HOST}:${SERVER_PORT}/api/spotify/getPlaylistItems`, { spotifyId })
        .catch(err => console.log(err))

    const withPreview = data.map(item => item.track).filter(item => item.preview_url)

    const songsArrayCopy = [...withPreview]
    const gameSongs = []
    const gameObjs = []

    for (let i = 0; i < rounds; i++) {
        gameSongs.push(getRandomSong(songsArrayCopy)[0])
    }

    gameSongs.forEach(song => {
        const dummyArray = []
        song.correct = true
        for (let i = 0; i < dummySongs; i++) {
            dummyArray.push(getRandomSong(songsArrayCopy)[0])
        }
        dummyArray.forEach(item => item.correct = false)
        gameObjs.push({ song, dummyArray })
    })

    return gameObjs
}

const addRoom = async ({ username, gameId, playlistName, playlistId, spotifyId, playlistImg }, socketId, io) => {

    


    //use getRandomSong to pull the 5 game tracks with 3 dummy tracks each for gameplay

    rooms.push({
        gameId,
        users: [{ username, socketId, score: 0 }],
        playlistName,
        spotifyId,
        playlistImg,
        gameObjs: await getGameSongs(spotifyId),
        playing: false,
        currentRound: 1,
        counter: 0
    })


    io.in(gameId).emit('sendSongs', { songs: getRoom(gameId).gameObjs })
}

const removeRoom = (gameId) => {
    const index = rooms.findIndex(item => item.gameId === gameId)
    rooms.splice(index, 1)
}

//user functions

const addUser = ({ gameId, username, socketId }, io, socket) => {
    const currentRoom = getRoom(gameId)
    const users = rooms.find(item => item.gameId === gameId).users

    users.push({ username, socketId, score: 0 })

    io.in(gameId).emit('sendSongs', { songs: getRoom(gameId).gameObjs })
    socket.to(gameId).emit('userJoined', username)
}

const removeUser = (gameId, socketId, socket) => {
    try {
        const users = rooms.find(item => item.gameId === gameId).users


        const user = users.find(user => user.socketId === socketId)

        if (user) {
            socket.to(gameId).emit('userLeft', user.username)
            console.log('removing user')
            return users.splice(users.findIndex(item => item.socketId === user.socketId), 1)[0]
        }
    } catch {
        console.log('remove user failed')
    }
}

const getUsersInRoom = (gameId) => {
    try {
        return rooms.find(item => item.gameId === gameId).users
    } catch {
        return false
    }
}


module.exports = { getRoom, addRoom, removeRoom, addUser, removeUser, getUsersInRoom, runGame, changeScore }