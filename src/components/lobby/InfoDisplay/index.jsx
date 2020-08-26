import React from 'react'

//Material UI
import {
    Box,
    Typography,
    Button,
    CardMedia,
} from '@material-ui/core'

const InfoDisplay = ({ imageClass, playlistName, playlistImg, startGame, winner }) => (
    <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        border={1}
        borderRadius='borderRadius'
    >
        {winner &&
            <Typography align='center'>{winner} won last time, try and beat 'em?</Typography>
        }
        <CardMedia className={imageClass} title={playlistName} component='img' src={playlistImg} />
        <Button
            color='primary'
            variant='contained'
            onClick={() => startGame()}
        >
            Play
        </Button>
    </Box>
)

export default InfoDisplay