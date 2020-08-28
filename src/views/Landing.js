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
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GitHubIcon from '@material-ui/icons/GitHub';

const Landing = (props) => {
    //Context
    const { usernameValue, gameHashValue } = useContext(Context)
    const { username, setUsername } = usernameValue
    const { gameHash, setGameHash } = gameHashValue

    //State
    const [playlists, setPlaylists] = useState([])
    const [displayPlaylists, setDisplayPlaylists] = useState(false)
    const [joinDisplay, setJoinDisplay] = useState(false)
    const [usernamePrompt, setUsernamePrompt] = useState(false)

    const handleChoosePlaylist = (spotifyId) => {
        const newHash = createHash(10) + '$' + spotifyId
        setGameHash(newHash)
    }

    const handleJoinGame = (e) => {
        e.preventDefault()

        username ? setGameHash(props.match.params.gameHash) : setUsernamePrompt(true)
    }

    const handleNewGame = (e) => {
        e.preventDefault()

        username ? setDisplayPlaylists(true) : setUsernamePrompt(true)
    }

    useEffect(() => {
        if (!playlists.length) {
            axios.get('/api/playlists').then(res => setPlaylists(res.data))
        }
        if (props.match.params.gameHash) {
            setJoinDisplay(true)
        }
        if (username) {
            setUsernamePrompt(false)
        }
    }, [playlists, setJoinDisplay, props.match.params.gameHash, username, setUsernamePrompt])

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
                                handleNewGame={handleNewGame}
                                usernamePrompt={usernamePrompt}
                            />
                        </Grid >
                        <Grid item xs={12} sm={6} >
                            <InfoButton title='How to Play' >
                                <Typography>To start a game, simply enter a username and click 'New Game'.  Then choose a playlist for your game to pull songs from.  Finally, use the invite link at the bottom of the lobby page to invite friends to play with you.

                                </ Typography>
                                <br />
                                <Typography>
                                    To join a game, paste the link your friend sent you into your web browser.  Enter a username, and click 'Join Game'.  It's that simple!
                                </Typography>
                                <br />
                                <Typography>
                                    Once everyone is in the lobby, click 'Play' to start a new round.  From there it's on: try to be the first to select the correct song card for the song that's playing.  The person who gets the most songs right the fastest wins!
                                </Typography>
                                <br />
                                <Typography>
                                    When you get redirected to the lobby, you can play again the same way.  Every time you play a new game, a new set of songs is pulled from the same playlist.  There may be duplicates from the previous game, but not many
                                </Typography>
                                <br />
                                <Typography>
                                    Try all the playlists to test your friends' musical knowledge!
                                </Typography>
                            </InfoButton>
                            <InfoButton title='About' >
                                <Typography>
                                    Built by <a rel='noopener noreferrer' target='_blank' href='https://stephensnell.dev'>Stephen Snell</a> using Spotify's <a target='_blank' rel='noopener noreferrer' href='https://developer.spotify.com/documentation/web-api/'>Web API</a>
                                </Typography>
                                <br/>
                                <Typography component='span'>
                                    Check out the Github: <a target='_blank' rel='noopener noreferrer' href='https://github.com/ssnell227/feefifidleyio-rebuild'><GitHubIcon/></a>
                                </Typography>
                               
                            </InfoButton>
                        </Grid >
                    </Grid>
                }
                <Grid item>
                    {displayPlaylists &&
                        <Container maxWidth='md' >
                            <Grid container >
                                <Grid item xs={1}>
                                    <IconButton onClick={() => setDisplayPlaylists(false)}>
                                        <ArrowBackIcon />
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