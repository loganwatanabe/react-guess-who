import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Grid, AppBar, Toolbar, IconButton, Fab} from '@material-ui/core';
import superheroes from './examples/superhero.json';
import FaceCard from './FaceCard';

function Board(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	const [card, setCard] = useState();
	const [peek, setPeek] = useState(-130);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		console.log("render")
  	})

  	const generateCards = (data)=>{
  		if(data){
  			return(data.map((val)=>{return(<FaceCard data={val} key={val.name}/>)}))
  		}else{
  			return("no data")
  		}
  	}

  	const drawCard = ()=>{
  		let data = superheroes[0].cards
		if(data){
  			let item = data[Math.floor(Math.random() * data.length)];
  			setCard(item)
  			setPeek(0)
  		}else{
  			console.log("no data")
  		}
  	}

  	const cardClick = ()=>{
  		if(peek == 0){
  			setPeek(-130)
  		}else{
  			setPeek(0)
  		}
  	}

  	const displayCard = (chosen)=>{
  		if(chosen){
  			return(
  				<FaceCard data={chosen} chosen={true} key="chosen" onClick={cardClick}/>
  			)
  		}else{
  			return(
  				<FaceCard chosen={true} key="chosen" onClick={cardClick}/>
  			)
  		}
  	}

  return (
  	<React.Fragment>
  	<Grid container spacing={0} >
  		
  		{generateCards(superheroes[0].cards)}
  		
  	</Grid>
  	<Toolbar/>
  	<AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
        <Toolbar>
          <Fab variant="extended" color="secondary" aria-label="add" onClick={drawCard} style={{marginLeft: "auto", marginRight: 240}}>
            New Card
          </Fab>
          <div style={{position: "absolute", right: 0, bottom: peek, transition: "bottom 0.5s linear"}}>
            {displayCard(card)}
          </div>
        </Toolbar>
      </AppBar>
      </React.Fragment>
  );
}

export default Board;