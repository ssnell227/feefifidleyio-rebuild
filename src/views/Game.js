import React from 'react'
import SongCard from '../components/game/SongCard'
import Timer from '../components/game/Timer'

const Game = () => {
    return (
        <div>
            <Timer/>
            <SongCard/>
        </div>
    )
}

export default Game