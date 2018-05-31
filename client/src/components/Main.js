import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from './Search/SearchBar'
import Login from './Login/Login'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={SearchBar}/>
      <Route path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main
