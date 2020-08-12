import React, { useEffect, useContext, useState } from 'react'
import createHash from 'hash-generator'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

//utilities
import { Context } from '../context/Context'

//components
import Banner from '../components/landing/Banner'
import InfoButton from '../components/landing/InfoButton'
import Input from '../components/landing/Input'
import PlaylistCard from '../components/landing/PlaylistCard'



const Landing = () => {
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username, setUsername } = usernameValue
    const { gameHash, setGameHash } = gameHashValue
    
    const [playlists, setPlaylists] = useState([])
    const [displayPlaylists, setDisplayPlaylists] = useState(false)

    const handleChoosePlaylist = (spotifyId) => {
        const newHash = createHash(10) + '$' + spotifyId
        setGameHash(newHash)
    }

    useEffect(() => {
        if (!playlists.length) {
            axios.get('/api/playlists').then(res => setPlaylists(res.data))
        }
    }, [playlists])

    const playlistMap = playlists.map(item => (
        <PlaylistCard
            key={item.spotify_id}
            name={item.playlist_name}
            imgURL={item.img_url}
            spotifyId={item.spotify_id}
            className='playlist-card'
            handleChoosePlaylist={handleChoosePlaylist}
        />))

    return (
        <div>
            <Banner username={username} />
            <Input username={username} setUsername={setUsername} setDisplayPlaylists={setDisplayPlaylists} />
            {gameHash && <Redirect to={{
                pathname: '/lobby',
                state: {
                    playlist:
                        playlists.filter(item => item.spotify_id === gameHash.slice(11))[0]
                }
            }}
            />}
            <InfoButton title='How to Play'>This is the how to play description</InfoButton>
            <InfoButton title='About'>This is the about description</InfoButton>
            {displayPlaylists && playlistMap}
        </div>
    )
}

export default Landing