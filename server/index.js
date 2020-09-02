require('dotenv').config()

const express = require('express'),
    session = require('express-session'),
    cors = require('cors'),
    ctrl = require('./controllers/control'),
    path = require('path')
    

const { SERVER_PORT, SESSION_SECRET } = process.env

const app = express()


app.use(express.static(path.join(__dirname, 'build')));





app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: SESSION_SECRET
}))




const server = app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))

const io = require('socket.io')(server)
require('./utils/sockets')(io)

app.get('/*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
    next()
  });

//spotify endpoints

app.post('/api/spotify/getPlaylistItems', ctrl.getPlaylistItems)

app.get('/api/playlists', ctrl.getPlaylists)

