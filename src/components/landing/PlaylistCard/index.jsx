import React from 'react'

//Material UI
import { 
    Card, 
    Grid, 
    CardMedia 
} from '@material-ui/core'

const PlaylistDisplay = ({ name, imgURL, spotifyId, handleChoosePlaylist }) => (
    <Grid item>
        <Card onClick={() => handleChoosePlaylist(spotifyId)}>
            <CardMedia component='img' src={imgURL} title={name} />
            <p>{name}</p>
        </Card>
    </Grid>
)

export default PlaylistDisplay