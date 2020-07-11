import React, {useState, useEffect} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid} from '@material-ui/core'


function FaceCard(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	const [active, setActive] = useState(true);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
  	})

  	const cardClick = (event)=>{
  		if(props.chosen && props.onClick){
  			props.onClick()
  		}else{
  			setActive(!active)
  		}
  	}

  	const displayImage = ()=>{
  		if(props.data && props.data.url){
  			return(<img src={props.data.url} alt={props.data.name} height="120" />)
  		}else{
  			return(
  				<div style={{height: 240, width: "100%", fontSize: 24}}>
  					Draw a Card
  				</div>
  			)
  		}
  	}

    const GridChecker = ({ children }) => {
      if(props.chosen){
        return(children)
      }else{
        return(<Grid item xs={6} sm={3} m={2}>{children}</Grid>)
      }
    }


  return (
    <GridChecker>
	  	<Card style={{width: "100%", height: "100%", maxHeight: 240, textAlign: 'center'}} disabled={!active} raised={active}>
	      <CardActionArea onClick={cardClick}>
	      	{displayImage()}
	        <CardContent>
	        	<Typography gutterBottom variant="h5" component="h2">
	        		{props.data ? props.data.name : "???"}
	        	</Typography>
	        </CardContent>
	        {active ? "" : <div style={{height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, backgroundColor: 'black', opacity: '75%'}}></div>}
	      </CardActionArea>

	    </Card>
    </GridChecker>
  );
}

export default FaceCard;