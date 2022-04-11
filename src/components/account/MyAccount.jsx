import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {List, ListItem, ListItemText, Button, Grid} from '@material-ui/core'
import {homeBoards, getUsersBoards} from '../api/api-server'

import LinkedAccounts from './LinkedAccounts'


function MyAccount(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);

	// Note: the empty deps array [] means
	// this useEffect will run oncea
	// similar to componentDidMount()
  useEffect(() => {
      
    }, [props.user])



  const accountInfo = () => {
    console.log(props.user)
  }


  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        Your info:
        <br/>
        name: {props.user ? props.user.displayName : "loading"}
        <br/>
        email: {props.user ? props.user.email : "loading"}
        <br/>
        emailVerified: {props.user ? props.user.emailVerified ? "true" : "false" : "loading"}
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        Your Linked Accounts
        
        <LinkedAccounts user={props.user}/>
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        Sign Out
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        Option to delete account
      </Grid>
    </Grid>
  );
}

export default MyAccount;