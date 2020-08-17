import React from 'react'

const Input = ({username, setUsername, setDisplayPlaylists, joinDisplay, handleJoinGame}) => (
    <div>
        <p>Enter a username:</p>
        <input onChange={(e) => {
            e.preventDefault()
            setUsername(e.target.value)
        }}/>
        {joinDisplay && <button onClick={() => handleJoinGame()}>
            Join game
        </button>}
        {!joinDisplay && <button onClick={() => username ? setDisplayPlaylists(true): null}>
            New game
        </button>}
    </div>
)

export default Input