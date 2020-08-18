import React from 'react'

//Material UI
import {
    Grid,
    Card,
    CardMedia
} from '@material-ui/core'

const SongCard = ({ name, imgURL, artist, handleSetGuessed, classStr }) => (
    <Grid item xs={12} md={6}>
        <Card className={classStr} onClick={() => handleSetGuessed(name)}>
            <p>{name}</p>
            <p>{artist}</p>
            <CardMedia component='img' src={imgURL} title={name} />
        </Card>
    </Grid>
)

export default SongCard