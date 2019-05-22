import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Home from './Containers/Home.js'
import User from './Containers/User.js'
import Trip from './Containers/Trip.js'
import Error from './Containers/Error.js'

import { connect } from 'react-redux'
import { logIn } from './Redux/actions.js'

class App extends React.Component {

  componentDidMount() {
      if (localStorage.getItem('token')) {
      fetch('http://localhost:3005/users/reauthorize', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        return response.json();
      })
      .then(returnedLoginInfo => {
        this.props.logIn(returnedLoginInfo.user);
      })
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/trip/:id" component={Trip} />
          <Route path="/" component={Error} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, { logIn } )(App)
