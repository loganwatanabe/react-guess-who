import React, {useState, useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import {Grid, TextField, Button} from '@material-ui/core';
import superheroes from './examples/superhero.json';
import FaceCardInput from './FaceCardInput';
import FaceCard from './FaceCard';
import {createBoard, getBoard, updateBoard, deleteBoard} from '../api/api'



import firebase from '../../firebase/index'
import {createABoard, getABoard, updateABoard, deleteABoard} from '../api/api-server'

function NewBoard(props){
  const history = useHistory()

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const { id } = useParams();

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    if(props.edit){
      getABoard(id, data => {
        setName(data[0].name)
        setCards(data[0].cards)
      })
    }
  },[])



  const fieldChange = (field, event)=>{
    if(field=="name"){
      setName(event.target.value)
    }
  }

  const deleteCard = (index)=>{
    let updatedCards = [...cards]
    updatedCards.splice(index, 1)
    setCards(updatedCards)
  }

  const generateCards = (data)=>{
    if(data){
      return(data.map((val, index)=>{return(<FaceCardInput data={val} index={index} key={index} onChange={cardInput} onDelete={deleteCard}/>)}))
    }else{
      return("no data")
    }
  }

  const addCard = ()=>{
    let temp = cards.concat([{name: "", url: ""}])
    setCards(temp)
  }

  const cardInput = (index, change) => {
    let temp = cards.map((card, ind) => { 
      if(ind==index){
        return {...card, ...change}
      }else{
        return card
      }
    })
    setCards(temp)
  }

  const saveBoard = () => {
    let data = {name: name, cards: cards}

    if(props.new){
      createABoard(data, (res)=>{
        if(res.id){
          history.push("/boards/"+res.id)
        }else{
          console.log("ERRORERRORERROR")
        }
      })

    }else if(props.edit && id){
      updateABoard(id, data, (res)=>{
        console.log(res)
        history.push("/boards/"+id+"/edit")
      })
    }else{
      console.log("ERROR")
      alert("ERROR")
    }
  }

  const deleteB = () => {
    if(props.edit && id){
      // let confirmation = confirm("Proceed with delete?")
      let confirmation = true
      if(confirmation){
        deleteABoard(id, (res)=>{
          console.log("successful delete")
          console.log(res)
          history.push("/")
        })
      }
      //if false, do nothing
    }else{
      console.log("ERROR")
      alert("ERROR")
    }
  }

  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        <TextField label="Board Name" variant="outlined" value={name} onChange={(e)=>fieldChange("name",e)}/>
      </Grid>
      <Grid item xs={12} container spacing={4} style={{margin: 0}}>
        {generateCards(cards)}
        <FaceCard data={{name: "+ Add Card"}} onClick={addCard}/>
      </Grid>
      <Grid item xs={12} style={{textAlign: "center"}}>
        <Button onClick={saveBoard} variant="contained" color="primary">Save Board</Button>
      </Grid>
      <Grid item xs={12} style={{textAlign: "center"}}>
        {props.edit ? <Button onClick={deleteB} variant="contained" color="secondary">DELETE Board</Button> : ""}
      </Grid>
    </Grid>
  );
}

export default NewBoard;