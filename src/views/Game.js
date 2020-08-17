import React, {useState, useEffect} from 'react'
import SongCard from '../components/game/SongCard'
import Timer from '../components/game/Timer'

//08/13/20 rendering song cards in correct order, but there's a strange problem with the order of the cards for the last round.

const Game = ({songs, socket, setPlayingLobby}) => {
    const [currentSongs, setCurrentSongs] = useState([])
    const [playing, setPlaying] = useState(false)
    const [round, setRound] = useState(0)
    const [timer, setTimer] = useState(null)
    const [gameOver, setGameOver] = useState(false)
    const [guessed, setGuessed] = useState(false)
    
    const generateRandomOrdered = (currentRound) => {
        
        const choiceArray = [songs[currentRound].song, ...songs[currentRound].dummyArray]
        const availableIndices = choiceArray.map((i, index) => index)
        const shuffledArray = new Array(4)

        choiceArray.forEach(item => {
            const randomIndex = Math.floor(Math.random() * availableIndices.length - 1)

            shuffledArray.splice(availableIndices.splice(randomIndex, 1), 1, item)
        })
        setCurrentSongs(shuffledArray)
    }
    //update timer, trigger game over, and update parent component state on game-over
    useEffect(() => {
        socket.on('timerDecrement', ({ seconds }) => {
            //what was I using socket for here?
            console.log(seconds, 'seconds from server')
            setTimer(seconds)
        })

        socket.on('gameOver', () => {
            setGameOver(true)
        })
        // return setPlayingLobby(false)
    }, [])

    //switches between song playing countdown and get ready countdown
    useEffect(() => {
        socket.on('switchMode', ({currentRound}) => {
            setPlaying(playing => !playing)
            setRound(currentRound)
        })
    })

    //updates the round and creates the next round's list of songs
    useEffect(() => {
        
        socket.on('nextRound', () => {
            // console.log(currentRound, 'round from server')
            // setRound(currentRound)
            // setGuessed(false)
            console.log(songs)
            console.log(round, 'round from state')
            if (round < songs.length) {
                generateRandomOrdered(round)
            }
        }) 
    }, [round, socket, songs, generateRandomOrdered])

    //function to take in full list of songs for the game and set state to a randomly ordered set of songs for a single round

    const songsMap = currentSongs.map((song, index) => (
        <SongCard 
        key={index+'song'}
        name={song.name} 
        imgURL={song.album.images[0].url} 
        artist={song.artists[0].name}
        />
    ))

    return (
        <div>
            <Timer timer={timer}/>
            {songsMap}
        </div>
    )
}

export default Game