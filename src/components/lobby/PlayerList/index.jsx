import React from 'react'

const PlayerList = ({ users }) => {
    const usersMap = users.map((user, index) => (
        <div key={index}>
            <p>{user.username}</p>
        </div>
    ))
    return (
        <div>
            {usersMap}
        </div>
    )
}

export default PlayerList