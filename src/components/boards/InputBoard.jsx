import React, {useState, useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import {Grid, TextField, Button} from '@material-ui/core';
import superheroes from './examples/superhero.json';
import FaceCardInput from './FaceCardInput';
import FaceCard from './FaceCard';
import {createBoard, getBoard, updateBoard} from '../api/api'
import GoogleLogin from 'react-google-login';

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
      getBoard(id, data => {
        setName(data[0].name)
        setCards(data[0].cards)
      })
    }
  },[])


  const responseGoogle = (response) => {
    console.log(response);
  }

  const fieldChange = (field, event)=>{
    if(field=="name"){
      setName(event.target.value)
    }
  }

  const generateCards = (data)=>{
    if(data){
      return(data.map((val, index)=>{return(<FaceCardInput data={val} index={index} key={index} onChange={cardInput}/>)}))
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
    if(props.new){
      let data = {name: name, cards: cards}
      createBoard(data, (res)=>{
        history.push("/boards/"+res.data.document_id+"/edit")
      })
    }else if(props.edit && id){
      let data = {name: name, cards: cards}
      updateBoard(id, data, (res)=>{
        history.push("/boards/"+id+"/edit")
      })
    }else{
      console.log("ERROR")
      alert("ERROR")
    }
  }

  return (
    <Grid container spacing={0} >
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        <GoogleLogin
          clientId="995311730381-fslk423mb22uc1algiv24pb8nchfh9d0.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", paddingTop: 16}}>
        <TextField label="Board Name" variant="outlined" value={name} onChange={(e)=>fieldChange("name",e)}/>
      </Grid>
      <Grid item xs={12} container spacing={2} style={{margin: 0}}>
        {generateCards(cards)}
        <FaceCard data={{name: "+ Add Card"}} onClick={addCard}/>
      </Grid>
      <Grid item xs={12} style={{textAlign: "center"}}>
        <Button onClick={saveBoard} variant="contained" color="secondary">Save Board</Button>
      </Grid>
    </Grid>
  );
}

export default NewBoard;