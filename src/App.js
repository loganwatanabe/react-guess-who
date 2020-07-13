import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './components/common/Header';
import Boards from './components/boards/Boards';
import Homepage from './components/Homepage';


function App() {
  return (
    <div>
      <Router>
        <Header/>
        <Switch>
          <Route path="/boards">
            <Boards/>
          </Route>
          <Route exact path="/">
            <Homepage/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
