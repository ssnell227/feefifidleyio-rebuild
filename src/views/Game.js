import React, {useState, useEffect, useRef, useContext} from 'react'
import SongCard from '../components/game/SongCard'
import Timer from '../components/game/Timer'

import {Context} from '../context/Context'

//Material UI
import {
    Container,
    Grid
} from '@material-ui/core'

//08/13/20 rendering song cards in correct order, but there's a strange problem with the order of the cards for the last round.

const Game = ({songs, socket, setPlayingLobby}) => {
    //state
    const [currentSongs, setCurrentSongs] = useState([])
    const [playing, setPlaying] = useState(false)
    const [round, setRound] = useState(1)
    const [timer, setTimer] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [guessed, setGuessed] = useState('')

    //context
    const { gameHashValue } = useContext(Context)
    const { gameHash } = gameHashValue

    //refs
    const audioRef = useRef(null)

    //functions
    const generateRandomOrdered = (currentRound) => {
        
        const choiceArray = [songs[currentRound-1].song, ...songs[currentRound-1].dummyArray]
        const availableIndices = choiceArray.map((i, index) => index)
        const shuffledArray = new Array(4)

        choiceArray.forEach(item => {
            const randomIndex = Math.floor(Math.random() * availableIndices.length - 1)

            shuffledArray.splice(availableIndices.splice(randomIndex, 1), 1, item)
        })
        
        setCurrentSongs(shuffledArray)
    }

    const handleSetGuessed = (songName) => {
        if (!guessed) {
            setGuessed(songName)
        }
        if (!guessed && playing && songName === songs[round-1].song.name) {
            socket.emit('changeScore', {gameId: gameHash, socketId: socket.id, correctSong: songName, date: Date.now()})
        }
    }

    //update timer, trigger game over, and update parent component state on game-over
    useEffect(() => {
        socket.on('timerDecrement', ({ seconds }) => {
            //what was I using socket for here?
           
            setTimer(seconds)
        })

        socket.on('gameOver', () => {
            // setGameOver(true)
            setGuessed('')
            setRound(1)
            setPlayingLobby(false)
        })
    }, [socket])

    //switches between song playing countdown and get ready countdown
    useEffect(() => {
        socket.on('switchMode', ({currentRound, roomPlaying}) => {
            console.log('switch mode')
            
            setPlaying(roomPlaying)
            setRound(currentRound)
        })
    }, [socket])

    //updates the round and creates the next round's list of songs
    useEffect(() => {
        
        socket.on('nextRound', () => {
            // console.log(currentRound, 'round from server')
            // setRound(currentRound)
            
            console.log(round, 'round from state')
            if (round <= songs.length) {
                setGuessed('')
                generateRandomOrdered(round)
            }
        }) 
    }, [round, socket, songs])

    useEffect(() => {
        if (playing && !gameOver) {
            audioRef.current.play() 
        } else {
            audioRef.current.pause()
        }
    }, [playing, gameOver])

    //function to take in full list of songs for the game and set state to a randomly ordered set of songs for a single round

    const songsMap = currentSongs.map((song, index) => (
        <SongCard 
        handleSetGuessed={handleSetGuessed}
        classStr={`gameCard ${guessed && song.correct ? 'correct' : null} ${guessed && !song.correct && guessed === song.name ? 'incorrect' : null}`}
        key={index+'song'}
        name={song.name} 
        imgURL={song.album.images[0].url} 
        artist={song.artists[0].name}
        />
    ))

    return (
        <Container>
            <Timer timer={timer}/>
            <Grid container spacing={2}>
            {songsMap}
            </Grid>
            <audio ref={audioRef} preload='auto' src={round -1 >= 0 && songs[round-1].song.preview_url}/>
        </Container>
    )
}

export default Game