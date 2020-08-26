import React from 'react'

//Material UI
import {
    FormControl,
    Button,
    Box,
    TextField,
    Paper
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const InputForm = ({ username, setUsername, setDisplayPlaylists, joinDisplay, handleJoinGame }) => (
    <form>
        <Paper>
            <Box
                border={1}
                borderRadius='borderRadius'
                height={200}
                flexDirection='column'
                alignItems='center'
                justifyContent='space-around'
                display="flex"
            >
                <FormControl>
                    <TextField
                        label='Enter a username'
                        id='username-field'
                        size='medium'
                        variant='outlined'
                        onChange={(e) => {
                            e.preventDefault()
                            setUsername(e.target.value)
                        }}
                    />
                </FormControl>
                {joinDisplay &&
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        onClick={() => handleJoinGame()}
                    >
                        Join game
                    </Button>}
                {!joinDisplay &&
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        onClick={() => username ? setDisplayPlaylists(true) : null}
                    >
                        New game
                    </Button>}
            </Box>
        </Paper>
    </form>
)

export default InputForm