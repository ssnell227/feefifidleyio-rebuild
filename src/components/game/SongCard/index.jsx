import React from 'react'

const SongCard = ({name, imgURL, artist}) => (
    <div>
        <p>{name}</p>
        <p>{artist}</p>
        <img src={imgURL} alt={name}/>
    </div>
)

export default SongCard