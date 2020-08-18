import React from 'react'

//Material UI
import {
    Container,
    InputAdornment,
    InputLabel,
    FormControl,
    Input,
    Button
} from '@material-ui/core'

import {
    AccountCircle
} from '@material-ui/icons'

const InputForm = ({ username, setUsername, setDisplayPlaylists, joinDisplay, handleJoinGame }) => (
    <Container>
        <form>
        <FormControl>
            <InputLabel htmlFor='username-field'>Enter a username:</InputLabel>
            <Input
                id='username-field'
                startAdornment={
                    <InputAdornment position='start'>
                        <AccountCircle />
                    </InputAdornment>
                }
                onChange={(e) => {
                    e.preventDefault()
                    setUsername(e.target.value)
                }}
            />
        </FormControl>
            {joinDisplay && <Button type='submit' onClick={() => handleJoinGame()}>
                Join game
        </Button>}
            {!joinDisplay && <Button type='submit' onClick={() => username ? setDisplayPlaylists(true) : null}>
                New game
        </Button>}
        </form>
    </Container>
)

export default InputForm