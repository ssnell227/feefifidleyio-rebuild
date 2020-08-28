import React from 'react'

//Material UI
import {
    Card,
    Grid,
    CardMedia,
    CardActionArea,
} from '@material-ui/core'

const PlaylistDisplay = ({ name, imgURL, spotifyId, handleChoosePlaylist }) => (
    <Grid item xs={12} sm={6} md={4}>
        <Card onClick={() => handleChoosePlaylist(spotifyId)}>
            <CardActionArea>
                <CardMedia component='img' src={imgURL} title={name} />
            </CardActionArea>
        </Card>
    </Grid>
)

export default PlaylistDisplay