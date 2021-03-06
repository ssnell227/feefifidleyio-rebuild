import React from 'react'

//Material UI
import {
    AppBar,
    Typography,
    Toolbar,
    Box
} from '@material-ui/core'

const InviteLink = ({ gameHash }) => (
    <AppBar position='static'>
        <Toolbar>
            <Box>
                <Typography>Invite your friends:</Typography>
                <Typography variant='h4'> {`https://rebuild.feefifidley.io/landing/${gameHash}`}</Typography>
            </Box>
        </Toolbar>
    </AppBar>
)

export default InviteLink
