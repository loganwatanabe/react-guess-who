import React, {useState, useEffect, useContext} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid, TextField, Button, Modal, Fab} from '@material-ui/core'

import ReactGiphySearchbox from 'react-giphy-searchbox'
import './input.css';


function GiphySearch(props){

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const { fetchGifs, searchKey } = useContext(SearchContext)
  // const giphyContext = SearchContextManager

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  // useEffect(() => {
  //   })

    const gifClick = (gif, event) => {
      console.log(gif)
      props.submitNewURL(gif.images.fixed_height_small.url)
    }


  return(
    <ReactGiphySearchbox
    apiKey='h5eeEPoGT1f2w1jVdo6i4EEZaJnUQlFy'
    onSelect={gifClick}
    style={{width: "100%"}}
    searchFormClassName="giphyForm"
    wrapperClassName="giphyComponent"
    gifPerPage="100"
    gifListHeight="360px"
    masonryConfig = {[
      //375-575
      { columns: 2, imageWidth: 140, gutter: 10 },
      { mq: '575px', columns: 2, imageWidth: 200, gutter: 10 },
      { mq: '700px', columns: 3, imageWidth: 150, gutter: 10 },
      { mq: '900px', columns: 4, imageWidth: 150, gutter: 10 },
    ]}
    />
  )
}


export default GiphySearch;