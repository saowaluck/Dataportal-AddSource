import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddSourceForm from './AddSourceForm'
import DisplaySourceDetail from './../containers/DisplaySourceDetail'
import ListAllSource from './../containers/ListAllSource'
import Header from './Header'
import './../assets/css/main.css'

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={ListAllSource} />
        <Route path='/resources/add/' component={AddSourceForm} />
        <Route
          path='/resources/:id'
          render={({ match }) => <DisplaySourceDetail id={match.params.id} />}
        />
      </Switch>
    </div>
  </Router>
)

export default App
