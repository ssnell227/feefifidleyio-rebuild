import React, { useEffect, useState, useContext } from 'react'
import io from 'socket.io-client'
import { Context } from '../context/Context'

//components
import Chat from '../components/lobby/Chat'
import InfoDisplay from '../components/lobby/InfoDisplay'
import InviteLink from '../components/lobby/InviteLink'
import PlayerList from '../components/lobby/PlayerList'
import Game from './Game'

//material UI
import {
    Container,
    Grid
} from '@material-ui/core'

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
    const [winner, setWinner] = useState('')


    //context
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username } = usernameValue
    const { gameHash } = gameHashValue

    const startGame = () => {
        if (users) {
            socket.emit('startGame')
        }
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
        socket.on('roomData', ({ room: {users} }) => {
            setUsers(users)
            if (loading) {
                setLoading(false)
            }
        })
    }, [loading])

    //set songs for game
    useEffect(() => {
        socket.on('sendSongs', ({ songs }) => {
            setSongs(songs)
        })
    }, [])

    return (
        <Container>
            <Grid container>
                <Grid item md={4}>
                    <PlayerList playing={playing} users={users} />
                </Grid>
                {playing &&
                    <Grid item md={4}>
                        <Game winner={winner} setWinner={setWinner} songs={songs} socket={socket} setPlayingLobby={setPlaying} />
                    </Grid>
                }
                {!playing &&
                    <>
                        <Grid item md={4}>
                            <InfoDisplay winner={winner} startGame={startGame} playlistName={playlistName} playlistImg={playlistImg} />
                        </Grid>
                        <Grid item md={4}>
                            <Chat />
                        </Grid>
                    </>
                }
            </Grid>
            {!playing &&
                <InviteLink gameHash={gameHash} />
            }
        </Container>
    )
}

export default Lobby