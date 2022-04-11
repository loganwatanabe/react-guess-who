import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {List, ListItem, ListItemText, Button} from '@material-ui/core'

import firebase from '../../firebase/index'


function NewUserLanding(props) {

  const history = useHistory()


	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
    
  	}, [])

  const content = () => {
    if(props.user && props.user.emailVerified){
      history.push("/myaccount")
    }else if(props.user){
      return(
        <p>
          We have sent an email verfication to {props.user.email}.  Please check it and click through the link to fully activate your account.
          <br/>
          You are now signed in, but will have limited actions available until you verify your email.
        </p>
      )
    }else{
      return(
        <p>Loading</p>
      )
    }
  }

  return (
    <div>
      {content()}
    </div>
  );
}

export default NewUserLanding;