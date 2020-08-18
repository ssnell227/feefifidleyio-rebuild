import React from 'react'

const PlayerList = ({ users }) => {
    const usersMap = users.sort((a,b) => b.score-a.score).map((user, index) => (
        <div key={index}>
            <p>{user.username}</p>
            <p>{Math.floor(user.score)}</p>
        </div>
    ))
    return (
        <div>
            {usersMap}
        </div>
    )
}

export default PlayerList