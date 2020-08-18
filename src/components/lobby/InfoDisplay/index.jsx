import React from 'react'

//Material UI
import {
    Container,
    Typography,
    Button,
    CardMedia,
} from '@material-ui/core'

const InfoDisplay = ({ playlistName, playlistImg, startGame, winner }) => (
    <Container>
        <Typography variant='h2'>{playlistName}</Typography>
        {winner &&
            <Typography>{winner} won last time, try and beat 'em?</Typography>
        }
        <CardMedia title={playlistName} component='img' src={playlistImg} />
        <Button onClick={() => startGame()}>Play</Button>
    </Container>
)

export default InfoDisplay