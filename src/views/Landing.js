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
    IconButton
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
            <Grid container direction='column' spacing={5}>
                <Grid item>
                    <BannerComp />
                </Grid>
                {!displayPlaylists &&
                    <Grid item container spacing={5} justify='space-between'>
                        <Grid item xs={12} sm={6} >
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
                <Grid item>
                    {displayPlaylists &&
                        <Container maxWidth='md' >
                            <Grid container >
                                <Grid item xs={1}>
                                    <IconButton onClick={() => setDisplayPlaylists(false)}>
                                        <ArrowBackIcon  />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography align='center' variant='h4' > Hey, {username}. Choose a playlist:</Typography>
                                </Grid>
                                <Grid xs={12} item container justify='center' spacing={2} >
                                    {playlistMap}
                                </Grid>
                            </Grid>
                        </Container >
                    }
                </Grid>
            </Grid>
            {gameHash &&
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