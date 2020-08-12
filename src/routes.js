import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './views/Landing'
import Lobby from './views/Lobby'

export default (
    <Switch>
        <Route path='/' exact component={Landing}/>
        <Route path='/Lobby' component={Lobby}/>
    </Switch>
)