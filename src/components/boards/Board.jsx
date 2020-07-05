import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Paper} from '@material-ui/core';
import superheroes from './examples/superhero.json';
import FaceCard from './FaceCard';

function Board(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
	// const [items, setItems] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		console.log(superheroes)
  	})

  	const generateCards = (data)=>{
  		if(data){
  			return(data.map((val)=>{return(<FaceCard data={val} key={val.name}/>)}))
  		}else{
  			return("no data")
  		}
  	}


  return (
  	<Grid container spacing={2}>
  		
  		{generateCards(superheroes[0].cards)}
  		
  	</Grid>
  );
}

export default Board;