import React from 'react'

const InviteLink = ({gameHash}) => (
    <div>
        <span>Invite your friends:</span>
    <p>{`localhost:3000/landing/${gameHash}`}</p>
    </div>
)

export default InviteLink