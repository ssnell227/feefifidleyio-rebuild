import React from 'react'

const InfoDisplay = ({playlistName, playlistImg, startGame}) => (
    <div>
        <p>{playlistName}</p>
        <img src={playlistImg} alt={playlistName}/>
        <p onClick={() => startGame()}>Play</p>
    </div>
)

export default InfoDisplay