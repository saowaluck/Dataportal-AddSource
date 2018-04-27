import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import Auth from './Auth'
import history from './history'

import rootReducer from './../reducers/'

import DisplayTeams from './DisplayTeams'
import AddResourceForm from './AddResourceForm'
import DisplayResourceDetail from './../containers/DisplayResourceDetail'
import Search from './Search'
import EditResource from './../containers/EditResource'
import Header from './Header'
import Home from './Home'
import TeamProfile from './TeamProfile'
import Login from './Login'
import Logout from './Logout'
import NotFoundPage from './NotFoundPage'
import MemberProfile from './../components/MemberProfile'
import EditProfile from './../components/EditProfile'
import AllTeamList from './../components/AllTeamList'
import AllMemberList from './AllMemberList'
import './../assets/css/main.css'

const auth = new Auth()

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk)),
)

const handleAuthentication = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const PrivateRoute = children => (
  auth.isAuthenticated() ? (
    <div>
      <Header auth={auth} />
      {children.children}
    </div>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
)

const App = () => (
  <Provider store={store} >
    <div>
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path='/' render={props => <Home auth={auth} {...props} />} />
            <Route path='/login/' render={() => <Login auth={auth} />} />
            <Route path='/logout/' render={() => <Logout auth={auth} />} />
            <Route path='/notfound/' component={NotFoundPage} />
            <Route
              path='/callback'
              render={props => {
                  handleAuthentication(props)
                  return <Home auth={auth} {...props} />
                }}
            />
            <PrivateRoute auth={auth}>
              <Switch>
                <Route path='/search/' render={props => <Search auth={auth} {...props} />} />
                <Route path='/resources/:id/edit/' component={EditResource} />
                <Route path='/resources/add/' render={props => <AddResourceForm auth={auth} {...props} />} />
                <Route path='/resources/:id/' render={props => <DisplayResourceDetail auth={auth} {...props} />} />
                <Route path='/teams/manage/' render={props => <DisplayTeams auth={auth} {...props} />} />
                <Route path='/teams/:id/' render={props => <TeamProfile auth={auth} {...props} />} />
                <Route path='/members/:id/edit/' render={props => <EditProfile auth={auth} {...props} />} />
                <Route path='/members/:id/' component={MemberProfile} />
                <Route exact path='/teams/' render={props => <AllTeamList auth={auth} {...props} />} />
                <Route exact path='/members/' component={AllMemberList} />
              </Switch>
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </div>
  </Provider>
)

export default App
