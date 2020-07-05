import React, {useState, useEffect} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase} from '@material-ui/core'


function FaceCard(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	const [active, setActive] = useState(true);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		// console.log(props)
  	})

  	const flipCard = (event)=>{
  		setActive(!active)
  	}


  return (

	<Paper>
	  	<Card style={{width: 240, maxHeight: 240}} disabled={!active} raised={active}>
	      <CardActionArea onClick={flipCard}>
	      	<img src={props.data.url} alt={props.data.name} height="120" />
	        <CardContent>
	        	<Typography gutterBottom variant="h5" component="h2">
	        		{props.data.name}
	        	</Typography>
	        </CardContent>
	        {active ? "" : <div style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'black', opacity: '75%'}}></div>}
	      </CardActionArea>

	    </Card>
  	</Paper>
  		
  );
}

export default FaceCard;