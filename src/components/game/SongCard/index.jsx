import React from 'react'

//Material UI
import {
    Grid,
    Card,
    CardMedia,
    Typography,
} from '@material-ui/core'

const SongCard = ({ name, imgURL, artist, handleSetGuessed, classStr }) => (
    <Grid item xs={12} md={6} onClick={() => handleSetGuessed(name)}>
        <Card className={classStr} >
            <Typography>{name}</Typography>
            <Typography>{artist}</Typography>
            <CardMedia component='img' src={imgURL} title={name} />
        </Card>
    </Grid>
)

export default SongCard