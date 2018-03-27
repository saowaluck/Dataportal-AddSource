import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Auth from './Auth'
import history from './history'
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
import './../assets/css/main.css'

const auth = new Auth()

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const PrivateRoute = (children) => (
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
            render={(props) => {
                handleAuthentication(props)
                return <Home auth={auth}{...props} />
              }}
          />
          <PrivateRoute auth={auth}>
            <Switch>
              <Route path='/search/' render={props => <Search auth={auth} {...props} />} />
              <Route path='/resources/:id/edit/' component={EditResource} />
              <Route path='/resources/add/' render={props => <AddResourceForm auth={auth} {...props} />} />
              <Route path='/resources/:id/' render={props => <DisplayResourceDetail auth={auth} {...props} />} />
              <Route path='/teams/:id/' render={(props) => <TeamProfile auth={auth}{...props} />} />
              <Route path='/members/:id/edit/' render={props => <EditProfile auth={auth} {...props} />} />
              <Route path='/members/:id/' component={MemberProfile} />
            </Switch>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  </div>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
