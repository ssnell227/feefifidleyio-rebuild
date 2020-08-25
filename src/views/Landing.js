import React, {
    useEffect,
    useContext,
    useState
} from 'react'
import createHash from 'hash-generator'
import {
    Redirect
} from 'react-router-dom'
import axios from 'axios'

//utilities
import {
    Context
} from '../context/Context'

//components
import BannerComp from '../components/landing/Banner'
import InfoButton from '../components/landing/InfoButton'
import InputForm from '../components/landing/Input'
import PlaylistCard from '../components/landing/PlaylistCard'

//Material UI
import {
    Container,
    Typography,
    Grid,
    IconButton,
    Box
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const Landing = (props) => {
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username, setUsername } = usernameValue
    const { gameHash, setGameHash } = gameHashValue

    const [playlists, setPlaylists] = useState([])
    const [displayPlaylists, setDisplayPlaylists] = useState(false)
    const [joinDisplay, setJoinDisplay] = useState(false)

    const handleChoosePlaylist = (spotifyId) => {
        const newHash = createHash(10) + '$' + spotifyId
        setGameHash(newHash)
    }

    const handleJoinGame = () => {
        if (username) {
            setGameHash(props.match.params.gameHash)
        }
    }

    useEffect(() => {
        if (!playlists.length) {
            axios.get('/api/playlists').then(res => setPlaylists(res.data))
        }
        if (props.match.params.gameHash) {
            setJoinDisplay(true)
        }
    }, [playlists, setJoinDisplay, props.match.params.gameHash])

    const playlistMap = playlists.map(item => (<
        PlaylistCard key={item.spotify_id}
        name={item.playlist_name}
        imgURL={item.img_url}
        spotifyId={item.spotify_id}
        className='playlist-card'
        handleChoosePlaylist={handleChoosePlaylist}
    />))

    return (
        <Container maxWidth='md' >
            <BannerComp />
            {!displayPlaylists &&
                <Grid container spacing='5' justify='space-between'>
                    <Grid  item xs={12} sm={6} >
                            <InputForm
                                handleJoinGame={handleJoinGame}
                                joinDisplay={joinDisplay}
                                username={username}
                                setUsername={setUsername}
                                setDisplayPlaylists={setDisplayPlaylists}
                            />
                    </Grid >
                    <Grid item xs={12} sm={6} >
                        <InfoButton title='How to Play' > This is the how to play description </InfoButton>
                        <InfoButton title='About' > This is the about description </InfoButton>
                    </Grid >
                </Grid>
            }
            {displayPlaylists &&
                <Container maxWidth='lg' >
                    <Typography > Hey, {username}.Choose a playlist:</Typography>
                    <IconButton>
                        <ArrowBackIcon onClick={() => setDisplayPlaylists(false)} />
                    </IconButton>
                    <Grid container spacing={2} >
                        {playlistMap}
                    </Grid>
                </Container >
            } {gameHash &&
                < Redirect to={
                    {
                        pathname: '/lobby',
                        state: {
                            playlist: playlists.filter(item => item.spotify_id === gameHash.slice(11))[0]
                        }
                    }
                } />}
        </ Container>
    )
}

export default Landing