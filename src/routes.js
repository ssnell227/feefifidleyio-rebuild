import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './views/Landing'
import Lobby from './views/Lobby'

export default (
    <Switch>
        <Route path='/landing' component={Landing}/>
        <Route path='/Lobby' component={Lobby}/>
        <Route path='/' exact component={Landing}/>
    </Switch>
)