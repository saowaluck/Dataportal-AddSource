import 'semantic-ui-css/semantic.min.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AddSourceForm from './AddSourceForm'
import DisplaySourceDetail from './../containers/DisplaySourceDetail'
import ListAllSource from './../containers/ListAllSource'
import Header from './Header'
import './css/main.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path='/' render={() => <ListAllSource />} />
          <Route path='/AddSourceForm' render={() => <AddSourceForm />} />
          <Route
            path='/DisplaySourceDetail/:id'
            render={({ match }) => <DisplaySourceDetail id={match.params.id} />}
          />
        </div>
      </Router>
    )
  }
}

export default App
