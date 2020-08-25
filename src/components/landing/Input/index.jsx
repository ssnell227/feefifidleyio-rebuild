import React from 'react'

//Material UI
import {
    Container,
    InputAdornment,
    InputLabel,
    FormControl,
    Input,
    Button,
    Box,
    Form,
    TextField
} from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const InputForm = ({ username, setUsername, setDisplayPlaylists, joinDisplay, handleJoinGame }) => (
    <form>
        <Box height={200} flexDirection='column' alignItems='center' justifyContent='space-around' display="flex" border={1}>
            <FormControl>
                <TextField
                    label='Enter a username'
                    id='username-field'
                    size='large'
                    variant='outlined'
                    onChange={(e) => {
                        e.preventDefault()
                        setUsername(e.target.value)
                    }}
                />
            </FormControl>
            {joinDisplay && <Button color='secondary' variant='outlined' type='submit' onClick={() => handleJoinGame()}>
                Join game
        </Button>}
            {!joinDisplay && <Button color='primary' variant='contained' type='submit' onClick={() => username ? setDisplayPlaylists(true) : null}>
                New game
        </Button>}
        </Box>
    </form>
)

export default InputForm