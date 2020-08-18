import React from 'react'

//Material UI
import {
    AppBar,
    Typography,
    Toolbar
} from '@material-ui/core'

const InviteLink = ({ gameHash }) => (
    <AppBar position='static'>
        <Toolbar>
            <Typography>Invite your friends:</Typography>
            <Typography variant='h4'> {`localhost:3000/landing/${gameHash}`}</Typography>
        </Toolbar>
    </AppBar>
)

export default InviteLink