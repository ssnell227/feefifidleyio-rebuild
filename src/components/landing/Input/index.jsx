import React from 'react'

//Material UI
import {
    FormControl,
    Button,
    Box,
    TextField,
    Paper,
} from '@material-ui/core'


const InputForm = ({ usernamePrompt, username, setUsername, handleNewGame, joinDisplay, handleJoinGame }) => (
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
                        error= {usernamePrompt ? true : false}
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
                        onClick={(e) => handleJoinGame(e)}
                    >
                        Join game
                    </Button>}
                {!joinDisplay &&
                    <Button
                        color='primary'
                        variant='contained'
                        type='submit'
                        onClick={(e) => handleNewGame(e)}
                    >
                        New game
                    </Button>}
            </Box>
        </Paper>
    </form>
)

export default InputForm