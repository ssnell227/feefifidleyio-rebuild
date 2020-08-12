import React from 'react'

const InfoDisplay = ({playlistName, playlistImg}) => (
    <div>
        <p>{playlistName}</p>
        <img src={playlistImg} alt={playlistName}/>
    </div>
)

export default InfoDisplay