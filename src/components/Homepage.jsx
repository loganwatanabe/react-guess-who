import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {homepageBoards} from './api/api'
import {List, ListItem, ListItemText, Button} from '@material-ui/core'
import {homeBoards, getUsersBoards} from './api/api-server'

import firebase from '../firebase/index'


function Homepage() {

	const [boards, setBoards] = useState([]);


	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		homeBoards(data => {
			console.log(data)
			setBoards(data)
		})
    
  	}, [])

  	const checkAuth = () => {
  		// let user = firebase.firebase.auth().currentUser;
  		let user = firebase.getCurrentUser();
      console.log(user)
  		// if(user){
    //     getUsersBoards(data => {
    //       console.log("users")
    //       console.log(data)
    //     })
  		// 	return(
  		// 		<div>
  		// 			YOU'RE SIGNED IN
  		// 			<br/>
  		// 			{user.uid}
  		// 			<br/>
  		// 			<Button onClick={logout}>LOGOUT</Button>
  		// 		</div>
  		// 	)
  		// }else{
  		// 	return firebase.signin
  		// }
  	}

  	const logout = () => {
  		firebase.signout()
  	}

  	const generateLinks = (boardsArray)=>{
  		if(!boardsArray){
  			return("loading")
  		}
  		return boardsArray.map(board => {
  			return(
  				<ListItem key={board.document_id}>
					<Link to={'/boards/'+board.document_id}>
					  <ListItemText primary={board.name} />
					</Link>
				</ListItem>
			)
  		})
  	}

  return (
    <div>
      EMULATOR

    	<List>
	  		<ListItem>
				<Link to={'/boards/new'}>
					<Button>Create New Board</Button>
				</Link>
			</ListItem>
    		{generateLinks(boards)}
    	</List>
    </div>
  );
}

export default Homepage;