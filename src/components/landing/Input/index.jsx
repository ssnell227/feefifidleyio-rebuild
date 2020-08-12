import React from 'react'

const Input = ({username, setUsername, setDisplayPlaylists}) => (
    <div>
        <input onChange={(e) => {
            e.preventDefault()
            setUsername(e.target.value)
        }}/>
        <button>
            Join game
        </button>
        <button onClick={() => username ? setDisplayPlaylists(true): null}>
            New game
        </button>
    </div>
)

export default Input