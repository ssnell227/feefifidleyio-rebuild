import React from 'react'

const PlaylistDisplay = ({name, imgURL, spotifyId, handleChoosePlaylist}) => (
    <div onClick={() => handleChoosePlaylist(spotifyId)}>
        <img src={imgURL} alt={name}/>
        <p>{name}</p>
    </div>
)

export default PlaylistDisplay