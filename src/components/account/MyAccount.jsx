import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {List, ListItem, ListItemText, Button} from '@material-ui/core'
import {homeBoards, getUsersBoards} from './api/api-server'


function MyAccount(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [boards, setBoards] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run oncea
	// similar to componentDidMount()
  useEffect(() => {
    homeBoards(data => {
      console.log(data)
      setBoards(data)
    })
    
    }, [])


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

export default MyAccount;