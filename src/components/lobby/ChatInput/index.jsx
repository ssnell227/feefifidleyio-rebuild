import React from 'react'

//material UI
import {
    Grid,
    TextField,
    IconButton
} from "@material-ui/core"

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'

const ChatInput = ({ input, setInput, sendMessage }) => (
    <form onSubmit={(e) => { sendMessage(e) }}>
        <Grid container>
            <Grid item xs={10}>
                <TextField variant='outlined' value={input} onChange={(e) => setInput(e.target.value)} />
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={(e) => { sendMessage(e) }}>
                    <ArrowUpwardIcon />
                </IconButton>
            </Grid>
        </Grid>
    </form>
)

export default ChatInput