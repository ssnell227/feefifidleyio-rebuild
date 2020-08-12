import React from 'react'
import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <Link  to='/'>Back</Link>
        </div>
    )
}

export default Nav

//8/12/20 link does not navigate back to home and react throws error