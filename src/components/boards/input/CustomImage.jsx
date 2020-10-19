import React, {useState, useEffect} from 'react';
import {Button, CircularProgress, TextField, Grid, GridList, GridListTile} from '@material-ui/core'
import {Search as SearchIcon} from '@material-ui/icons'
import {searchImages} from '../../api/image-api'
import './input.css';

function CustomImage(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [url, setUrl] = useState("");


	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
  	})

  const urlChange = (event)=>{
    console.log(event.target.value)
    setUrl(event.target.value)
  }

  const renderImage = () => {
    if(url){
      return(
        <img src={url} style={{width: "100%", maxHeight:"300px"}}/>
      )
    }else{
      return(
        <div>Paste an image URL address into the field above.</div>
      )
    }
  }

  const submitImage = () => {
      props.submitNewURL(url)
  }


  return (
    <Grid container justify="center" spacing={0} style={{width: "100%", marginTop: "10px"}}>
      <Grid item xs={12} className="searchFormRow" style={{textAlign: "center"}}>
        <TextField label="Image URL" size="small" variant="outlined"
        style={{height: "100%"}} InputProps={{style: {width: "230px"}}}
        value={url} onChange={(e)=>urlChange(e)}/>
      </Grid>
      <Grid item xs={12} className="imageResults" style={{textAlign: "center", marginTop: "10px"}}>
        {renderImage()}
      </Grid>
      <Grid item xs={12} className="imageResults" style={{textAlign: "center", marginTop: "10px"}}>
        <Button variant="contained" color="primary" onClick={submitImage}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}

export default CustomImage;