import React, {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'

import { Context } from '../context/Context'

const Nav = () => {
    const { gameHashValue } = useContext(Context)
    const { gameHash, setGameHash } = gameHashValue

    return (
        <div>
            <Link onClick={() => setGameHash(null)} to='/landing'>Home</Link>
        </div>
    )
}

export default withRouter(Nav)

//8/12/20 link does not navigate back to home and react throws error