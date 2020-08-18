import React from 'react'

//Material UI
import {
    Container,
    Typography,
    Grid,
    Avatar

} from '@material-ui/core'

const PlayerList = ({ users }) => {
    const usersMap = users.sort((a, b) => b.score - a.score).map((user, index) => (
        <Grid container item key={index}>
            <Avatar>{user.username && user.username.slice(0, 1)}</Avatar>
            <Typography>{Math.floor(user.score)}</Typography>
        </Grid>
    ))
    return (
        <Container>
            <Typography variant='h2'>Players</Typography>
            <Grid container>
                {usersMap}
            </Grid>
        </Container>
    )
}

export default PlayerList