import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Grid, AppBar, Toolbar, IconButton, Fab} from '@material-ui/core';
import superheroes from './examples/superhero.json';
import FaceCard from './FaceCard';
import {getBoard} from '../api/api'

function Board(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();
  const [card, setCard] = useState();
  const [name, setName] = useState("");
	const [cards, setCards] = useState([]);
	const [peek, setPeek] = useState(-130);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
    if(id == "example"){
      setName(superheroes[0].name)
      setCards(superheroes[0].cards)
    }else{
      getBoard(id, data => {
        setName(data[0].name)
        setCards(data[0].cards)
      })
    }
  	},[])

  	const generateCards = (data)=>{
  		if(data){
  			return(data.map((val)=>{return(<FaceCard data={val} key={val.name}/>)}))
  		}else{
  			return("no data")
  		}
  	}

  	const drawCard = ()=>{
  		let data = cards
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
  			setPeek(-125)
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
  				<FaceCard chosen={true} data={{name: "Draw A Card"}} key="chosen" onClick={cardClick}/>
  			)
  		}
  	}

  return (
  	<React.Fragment>
    	<Grid container spacing={0} >
        <Grid item xs={12} style={{textAlign: "center"}}>
          <h1>{name}</h1>
        </Grid>
        <Grid item xs={12} container spacing={2} style={{margin: 0}}>
    		  {generateCards(cards)}
    		</Grid>
    	</Grid>
    	<Toolbar style={{marginTop: 10}}/>
    	<AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
          <Toolbar>
            <Fab variant="extended" color="secondary" aria-label="add" onClick={drawCard} style={{marginLeft: "auto", marginRight: 240}}>
              New Card
            </Fab>
            <div style={{position: "absolute", right: 0, bottom: peek, transition: "bottom 0.5s linear", marginRight: 6, width:200}}>
              {displayCard(card)}
            </div>
          </Toolbar>
    </AppBar>
    </React.Fragment>
  );
}

export default Board;