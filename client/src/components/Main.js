import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from './Search/SearchBar'
import { WrappedLoginForm } from './Login/Login'
import { WrappedRegistrationForm } from './Join/Join'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={SearchBar}/>
      <Route path='/login' component={WrappedLoginForm}/>
      <Route path='/join' component={WrappedRegistrationForm}/>
    </Switch>
  </main>
)

export default Main
