import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import { Context } from '../context/Context'

//components
import Chat from '../components/lobby/Chat'
import InfoDisplay from '../components/lobby/InfoDisplay'
import InviteLink from '../components/lobby/InviteLink'
import PlayerList from '../components/lobby/PlayerList'
import Game from './Game'

let socket

const Lobby = (props) => {
    const {
        playlist_name: playlistName,
        spotify_id: spotifyId,
        img_url: playlistImg
    } = props.location.state.playlist

    //state
    const [playing, setPlaying] = useState(false)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [songs, setSongs] = useState([])


    //context
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username } = usernameValue
    const { gameHash } = gameHashValue

    const startGame = () => {
        socket.emit('startGame')
    }


    //mount and dismount effects
    useEffect(() => {
        
        socket = io()

        //send the server the user's data
        socket.emit('join', {
            username: username,
            gameId: gameHash,
            playlistName,
            spotifyId,
            playlistImg
        })

        //render the Game component through a state change
        socket.on('begin', () => {
            console.log('begin heard')
            setPlaying(true)
        })

        return () => {
            socket.emit('leaveRoom')
            socket.off()
        }
    }, [username, gameHash, playlistName, spotifyId, playlistImg])

    //room data functions
    useEffect(() => {
        socket.on('roomData', ({ room }) => {
            const { users } = room
            console.log(users)
            try {
                const sortedUsers = users.map(user => {
                    const userScore = user.score.map(item => 1 + 1 / (item.date % 100000))
                    return { username: user.username, userScore }
                }).sort((a, b) => b.userScore - a.userScore)

                setUsers(sortedUsers)
            } catch {
                setUsers(users)
            }
            if (loading) {
                setLoading(false)
            }
        })
    }, [loading])

    //set songs for game
    useEffect(() => {
        socket.on('sendSongs', ({songs}) => {
            setSongs(songs)
        })
    }, [])

    return (
        <div>
            Lobby
            <InfoDisplay startGame={startGame} playlistName={playlistName} playlistImg={playlistImg} />
            <PlayerList users={users} />
            <Chat />
            <InviteLink gameHash={gameHash}/>
            {playing && <Game songs={songs} socket={socket} setPlayingLobby={setPlaying} />}
        </div>
    )
}

export default Lobby