import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Header from './components/common/Header';
import Boards from './components/boards/Boards';
import Homepage from './components/Homepage';
import Login from './components/account/Login';
import MyBoards from './components/account/MyBoards';
import MyAccount from './components/account/MyAccount';

import firebase from './firebase/index'

function App() {

  const [user, setUser] = useState();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    const unsubscribe = firebase.checkAuth(setUser)
    return () => unsubscribe();
    }, [])

  return (
    <div>
      <Router>
        <Header user={user}/>
        <Switch>
          <Route path="/boards">
            <Boards/>
          </Route>
          <Route path="/myboards">
            <MyBoards user={user}/>
          </Route>
          <Route path="/myaccount">
            <MyAccount user={user}/>
          </Route>
          <Route exact path="/login">
            <Login user={user}/>
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
