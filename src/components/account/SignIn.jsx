import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {List, ListItem, ListItemText, Button, TextField, Grid} from '@material-ui/core'

import firebase from '../../firebase/index'


function SignIn(props) {

  const history = useHistory()

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
    
  	}, [])

  const emailChange = (event)=>{
    setEmail(event.target.value)
  }

  const passwordChange = (event)=>{
    setPassword(event.target.value)
  }

  const forgotPassword = ()=>{
    console.log("forgot")
    if(!email){
      alert("you need an email")
    }else{
      firebase.resetPassword(email, res => {
        console.log(res)
        alert("Password reset email sent! Please allow 5-10 minutes for the email to go through.")
      })
    }
  }

  const submit = ()=>{
    const userObj = {
      email: email,
      password: password
    }

    firebase.login(userObj.email, userObj.password, response => {
      console.log(response)
      history.push('/myaccount')
    })
  }

  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        <h1>LOGIN</h1>
        <TextField 
          id="email"
          label="Email"
          variant="outlined"
          required type="email"
          onChange={(e)=>{emailChange(e)}}
          value={email}/>
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

        <Button variant="contained" onClick={submit} >LOGIN</Button>
        <br/>
        <Button onClick={forgotPassword} size="small">Forgot Password</Button>

        <hr/>

        <Link to="/signup">Register</Link>



      </Grid>
    </Grid>
  );
}

export default SignIn;