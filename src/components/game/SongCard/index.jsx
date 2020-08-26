import React from 'react'

//Material UI
import {
    Grid,
    Card,
    CardMedia,
    Typography,
    CardActionArea,
    List,
    ListItem
} from '@material-ui/core'

const SongCard = ({ name, imgURL, artist, handleSetGuessed, borderClassStr, classStr }) => (
    <Grid item xs={12} md={6} onClick={() => handleSetGuessed(name)}>
        <Card className={borderClassStr + ' ' + classStr} >
            <CardActionArea>
                <CardMedia component='img' src={imgURL} title={name} />
                <Typography variant='body2' component='h2'   align='center'>{name}</Typography>
                <Typography variant='h6' component='h1'align='center'>{artist}</Typography>
            </CardActionArea>
        </Card>
    </Grid>
)

export default SongCard