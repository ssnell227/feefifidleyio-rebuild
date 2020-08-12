import React from 'react'

const InfoButton = ({ children, title }) => (
    <div>
        <div>
            {title}
        </div>
        <div>
            {children}
        </div>
    </div>
)

export default InfoButton