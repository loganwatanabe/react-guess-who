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
  		if(props.onClick){
  			props.onClick()
  		}else{
  			setActive(!active)
  		}
  	}

  	const displayImage = ()=>{
  		if(props.data && props.data.url){
  			return(<img src={props.data.url} alt={props.data.name}
          style={{width:"100%", height:"100%", objectFit:"cover"}}/>)
  		}else{
  			return(
  		    <div style={{height: "100%", width: "100%", backgroundColor: "grey", marginLeft: "auto", marginRight: "auto"}} />
  			)
  		}
  	}

    const GridChecker = ({ children }) => {
      if(props.chosen){
        return(children)
      }else{
        return(<Grid item xs={6} sm={4} md={2} style={{minHeight: "360px"}}>{children}</Grid>)
      }
    }

  return (
    <GridChecker>
	  	<Card style={{width: "100%", height: "100%", textAlign: 'center'}} disabled={!active} raised={active}>
	      <CardActionArea style={{height: "100%"}} onClick={cardClick}>
          <div style={{height: "90%", width: "100%", margin: "auto", overflow: "hidden"}}>
            {displayImage()}
          </div>
	        <CardContent style={{height:"10%", padding: "0px 6px"}}>
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