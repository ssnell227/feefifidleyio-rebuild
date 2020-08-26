import React from 'react'

//Material UI
import {
    Box,
    Typography,
    Grid,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText

} from '@material-ui/core'

const PlayerList = ({ users, playing }) => {
    const usersMap = users.sort((a, b) => b.score - a.score).map((user, index) => (
        <ListItem  key={`${index}-${user.username}`}>
            <ListItemAvatar>
                <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${user.username}.svg`}>{user.username && user.username.slice(0, 1).toUpperCase() + user.username.slice(0, 1)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={user.username}
                secondary={playing ?
                    Math.floor(user.score)
                    : null} />
        </ListItem>
    ))

    return (
        <Box border={1} borderRadius='borderRadius' height='100%'>
            <Typography variant='h2'>Players</Typography>
            <List container>
                {usersMap}
            </List>
        </Box>
    )
}

export default PlayerList