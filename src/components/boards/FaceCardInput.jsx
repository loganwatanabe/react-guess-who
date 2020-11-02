import React, {useState, useEffect, useContext} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid, TextField, Button, Modal, Fab} from '@material-ui/core'
import {Grid as GiphyGrid,SearchBar,SearchContext,SearchContextManager} from '@giphy/react-components'
import {Delete as DeleteIcon} from '@material-ui/icons'
import SearchModal from './input/SearchModal'

function FaceCardInput(props){

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [giphyOpen, setGiphyOpen] = useState(false);
  // const [search, setSearch] = useState('');
  const { fetchGifs, searchKey } = useContext(SearchContext)
  const giphyContext = SearchContextManager

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    })


    const displayImage = ()=>{
      if(props.data && props.data.url){
        return(
          <img src={props.data.url} alt={props.data.name}
          style={{width:"100%", height:"100%", objectFit:"cover"}}/>
        )

      }else{
        return(<div style={{height: "100%", width: "100%", backgroundColor: "grey", marginLeft: "auto", marginRight: "auto"}} />)
      }
    }

    const nameChange = (event)=>{
      props.onChange(props.index, {name: event.target.value})
    }

    const urlChange = (newURL) => {
      props.onChange(props.index, {url: newURL})
    }

    const removeCard = ()=>{
      props.onDelete(props.index)
    }

    const openGiphyModal = () => {
      setGiphyOpen(true)
    }

    const closeGiphy = () => {
      setGiphyOpen(false)
    }

    const giphyContent = () => {
      //fthis throws console error about trying to assign a Ref to a function
      return(
        <SearchModal urlChange={urlChange} closeModal={closeGiphy}/>
      )

    }

    const gifClick = (gif, event) => {
      urlChange({target: {value: gif.images.fixed_height_small.url}})
      event.preventDefault()
      closeGiphy()
    }

  return (
    <Grid item xs={6} sm={4} md={2} style={{minHeight: "360px"}}>
    <Modal
      open={giphyOpen}
      onClose={closeGiphy}
      style={{display: "flex", justifyContent: "center", alignItems: "center"}}
    >
      {giphyContent()}
    </Modal>
      <Card style={{width: "100%", height: "100%", textAlign: 'center', position:'relative'}}>
        <Fab color="secondary" aria-label="delete" size="small" onClick={removeCard} style={{right: '0', position: 'absolute', zIndex: "90"}}>
          <DeleteIcon />
        </Fab>
        <div style={{height: "70%", width: "100%", margin: "auto", overflow: "hidden"}}>
        {displayImage()}
        </div>
        <CardContent style={{height:"30%", padding: "0px 6px"}}>
            <Button onClick={openGiphyModal} color="primary"
            style={{marginBottom: "6px"}}
            >Change Image</Button>

            <TextField label="Card Name" size="small" variant="outlined" 
            style={{marginTop: "6px"}}
            inputProps={{autoComplete: "off"}}
            value={props.data.name} onChange={(e)=>nameChange(e)}/>
        </CardContent>
      </Card>
    </Grid>
  );
}


export default FaceCardInput;