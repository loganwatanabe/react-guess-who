import React, {useState, useEffect, useContext} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid, TextField, Button, Modal} from '@material-ui/core'
import {Grid as GiphyGrid,SearchBar,SearchContext,SearchContextManager} from '@giphy/react-components'

function FaceCardInput(props){

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [giphyOpen, setGiphyOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { fetchGifs, searchKey } = useContext(SearchContext)
  const giphyContext = SearchContextManager

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    })


    const displayImage = ()=>{
      if(props.data && props.data.url){
        return(<img src={props.data.url} alt={props.data.name} height="120" />)
      }
    }

    const fieldChange = (field, event)=>{
      if(field == "name"){
        props.onChange(props.index, {name: event.target.value})
      }else if(field == "url"){
        props.onChange(props.index, {url: event.target.value})
      }
    }

    const openGiphyModal = () => {
      setGiphyOpen(true)
    }

    const closeGiphy = () => {
      setGiphyOpen(false)
    }

    const giphyContent = () => {
      return(
        <SearchContextManager apiKey={'h5eeEPoGT1f2w1jVdo6i4EEZaJnUQlFy'} initialTerm={'cats'}>
              <GiphySearch onGifClick={gifClick}/>
        </SearchContextManager>
      )
    }

    const gifClick = (gif, event) => {
      fieldChange("url",{target: {value: gif.images.fixed_height_small.url}})
      event.preventDefault()
      closeGiphy()
    }

  return (
    <Grid item xs={6} sm={3} md={2}>
    <Modal
      open={giphyOpen}
      onClose={closeGiphy}
    >
      {giphyContent()}
    </Modal>
      <Card style={{width: "100%", minHeight: 240, maxHeight: 300, textAlign: 'center'}}>
          {displayImage()}
          <TextField label="Image URL" variant="outlined" value={props.data.url} onChange={(e)=>fieldChange("url",e)}/>
          <br/> OR <br/>
          <Button onClick={openGiphyModal} variant="contained" color="primary">Search Giphy</Button>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField label="Name" variant="outlined" value={props.data.name} onChange={(e)=>fieldChange("name",e)}/>
            </Typography>
          </CardContent>
      </Card>
    </Grid>
  );
}


const GiphySearch = (props) => {
    const { fetchGifs, searchKey } = useContext(SearchContext)
    return (
        <div>
            <SearchBar/>
            <GiphyGrid key={searchKey} columns={3} width={800} fetchGifs={fetchGifs} onGifClick={props.onGifClick}/>
        </div>
    )
}

export default FaceCardInput;