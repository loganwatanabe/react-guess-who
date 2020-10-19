import React, {useState, useEffect} from 'react';
import {Button, CircularProgress, TextField, Grid, GridList, GridListTile} from '@material-ui/core'
import {Search as SearchIcon} from '@material-ui/icons'
import {searchImages} from '../../api/image-api'
import './input.css';
import ContextualWebLogo from './ContextualWebLogo.png'

function ImageSearch(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);


	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
  	})

  const keywordChange = (event)=>{
    setKeyword(event.target.value)
  }

  const keyPress = (e)=>{
      if(e.keyCode == 13){
         submitSearch()
      }
   }

  const submitSearch = ()=>{
    setLoading(true)
    searchImages(keyword, (res)=>{
      let imgs = res.value

      if(imgs?.length){
        setImages(imgs)
      }

      setLoading(false)
    })
  }

  const imgClick = (img, event) => {
      props.submitNewURL(img)
  }

  const renderImages = () => {
    if(images.length){
      return(
        <GridList cellHeight={"auto"} cols={2} spacing={6} style={{height: "360px", width: "100%"}}>
          {images.map((image) => (
            <GridListTile key={image.url} cols={1} onClick={(e) => imgClick(image.url)}>
              <img src={image.url} alt={image.url} style={{width: "100%"}} />
            </GridListTile>
          ))}
        </GridList>
  )
    }else{
      return(
        <div>Search for a image with the field above.</div>
      )
    }
  }



  return (
    <Grid container justify="center" spacing={0} style={{width: "100%", marginTop: "10px"}}>
      <Grid item xs={12} className="searchFormRow" style={{textAlign: "center"}}>
        <TextField label="Search Images Online" size="small" variant="outlined"
        style={{height: "100%"}} InputProps={{style: {width: "230px"}}}
        value={keyword} onChange={(e)=>keywordChange(e)} onKeyDown={(e)=>keyPress(e)}/>
        <Button variant="contained" color="primary" style={{height: "40px"}}
          onClick={submitSearch}
        >
          <SearchIcon/>
        </Button>
      </Grid>
      <Grid item xs={12} className="imageResults" style={{textAlign: "center", marginTop: "10px"}}>
        {loading ? <CircularProgress /> : renderImages()}
      </Grid>
      <Grid item xs={12} style={{textAlign: "center", marginTop: "10px"}}>
        <p style={{color: "grey"}}>Powered by <img src={ContextualWebLogo} alt="ContextualWeb" style={{height: "1em"}}/></p>
      </Grid>
    </Grid>
  );
}

export default ImageSearch;