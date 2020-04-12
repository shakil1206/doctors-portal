import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';



function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Header></Header>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
