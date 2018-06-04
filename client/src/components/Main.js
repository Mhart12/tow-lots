import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from './Search/SearchBar'
import Profile from './Profile/Profile'
import { WrappedLoginForm } from './Login/Login'
import { WrappedRegistrationForm } from './Join/Join'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={SearchBar}/>
      <Route path='/login' component={WrappedLoginForm}/>
      <Route path='/join' component={WrappedRegistrationForm}/>
      <Route path='/profile' component={Profile} />
    </Switch>
  </main>
)

export default Main
