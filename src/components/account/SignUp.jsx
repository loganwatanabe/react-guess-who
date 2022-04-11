import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {List, ListItem, ListItemText, Button, TextField, Grid} from '@material-ui/core'

import firebase from '../../firebase/index'


function SignUp(props) {
  const history = useHistory()

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [confirmEmail, setConfirmEmail] = useState([]);
  const [password, setPassword] = useState([]);

    const nameChange = (event)=>{
      setName(event.target.value)
    }

    const emailChange = (event)=>{
      setEmail(event.target.value)
    }

    const confirmEmailChange = (event)=>{
      setConfirmEmail(event.target.value)
    }

    const passwordChange = (event)=>{
      setPassword(event.target.value)
    }



    //TO-DO: need validations on email, confirm, and password fields

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
    
  	}, [])


  //TO-DO: should probably move this logic to another file/server side
  const submit = ()=>{
    const userObj = {
      name: name,
      email: email,
      password: password
    }

    firebase.createNewUser(userObj, ()=>{
      console.log("create new user complete")
      console.log("to-do: redirect to new user landing page")
      history.push('/new-user')
    })
  }


  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        <h1>SIGN UP</h1>
        <TextField
        id="name"
        label="Name"
        variant="outlined"
        required
        onChange={(e)=>{nameChange(e)}}
        value={name}/>
        <br/>
        <TextField 
          id="email"
          label="Email"
          variant="outlined"
          required type="email"
          onChange={(e)=>{emailChange(e)}}
          value={email}/>
        <br/>
        <TextField
          id="confirm-email"
          label="Confirm Email"
          variant="outlined"
          required type="email"
          onChange={(e)=>{confirmEmailChange(e)}}
          value={confirmEmail}/>

        <br/>
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          onChange={(e)=>{passwordChange(e)}}
        />
        <br/>

        <Button variant="contained" onClick={submit} >Sign Up</Button>



      </Grid>
    </Grid>
  );
}

export default SignUp;