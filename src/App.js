import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Home from './Containers/Home.js'
import User from './Containers/User.js'
import Error from './Containers/Error.js'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/user/:id" component={User} />
        <Route path="/" component={Error} />
      </Switch>
    </div>

  );
}

export default App;
