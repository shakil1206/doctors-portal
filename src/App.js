import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './components/NotFound/NotFound';




function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard></Dashboard>
        </Route>
        <Route path="/home">
          <Header></Header>
        </Route>
        <Route exact path="/">
          <Header></Header>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
