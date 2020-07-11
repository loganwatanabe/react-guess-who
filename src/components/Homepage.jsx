import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {homepageBoards} from './api/api'
import {List, ListItem, ListItemText} from '@material-ui/core'

function Homepage() {

	const [boards, setBoards] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		homepageBoards(data => {
			setBoards(data)
		})
  	}, [])

  	const generateLinks = (boardsArray)=>{
  		if(!boardsArray){
  			return("loading")
  		}
  		return boardsArray.map(board => {
  			return(
  				<ListItem>
					<Link to={'/boards/'+board.document_id}>
					  <ListItemText primary={board.name} />
					</Link>
				</ListItem>
			)
  		})
  	}

  return (
    <div>
    	<List>
    		{generateLinks(boards)}
    	</List>
    </div>
  );
}

export default Homepage;