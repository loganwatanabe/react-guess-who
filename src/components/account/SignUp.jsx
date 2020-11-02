import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {List, ListItem, ListItemText, Button} from '@material-ui/core'

import firebase from '../../firebase/index'


function SignUp() {



	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
    
  	}, [])

  	const checkAuth = () => {
  		// let user = firebase.firebase.auth().currentUser;
  		let user = firebase.getCurrentUser();
  		if(user){
  			return(
  				<div>
  					YOU'RE SIGNED IN
  					<br/>
  					{user.uid}
  					<br/>
  					<Button onClick={logout}>LOGOUT</Button>
  				</div>
  			)
  		}else{
  			return firebase.signin
  		}
  	}

  	const logout = () => {
  		firebase.signout()
  	}

  return (
    <div>
      Sign In
    </div>
  );
}

export default SignUp;