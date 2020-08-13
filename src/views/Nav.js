import React from 'react'
import {Link, withRouter} from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <Link  to='/landing'>Back</Link>
        </div>
    )
}

export default withRouter(Nav)

//8/12/20 link does not navigate back to home and react throws error