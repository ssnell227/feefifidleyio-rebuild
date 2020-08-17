import React from 'react'

const SongCard = ({name, imgURL, artist, handleSetGuessed, classStr}) => (
    <div className={classStr} onClick={() => handleSetGuessed(name)}>
        <p>{name}</p>
        <p>{artist}</p>
        <img src={imgURL} alt={name}/>
    </div>
)

export default SongCard