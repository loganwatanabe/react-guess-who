import React, {useState, useEffect} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid, Fab, Tabs, Tab, TabPanel} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
import GiphySearch from './GiphySearch'
import ImageSearch from './ImageSearch'
import CustomImage from './CustomImage'

function SearchModal(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [active, setActive] = useState(true);
	const [tab, setTab] = useState(0);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
  })

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const submitNewURL = (newURL) => {
    props.urlChange(newURL)
    props.closeModal()
  }


  const tabContent = () => {
        switch(tab){
          case 0:
            return(
              <CustomImage submitNewURL={submitNewURL}/>
            )
          break;
          case 1:
            return(
              <ImageSearch submitNewURL={submitNewURL}/>
            )
          break;
          case 2:
            return(
              <GiphySearch submitNewURL={submitNewURL}/>
            )
          break;
          default:
            return(
              <CustomImage submitNewURL={submitNewURL}/>
            )
        }
  }

  	

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch"
    spacing={0} style={{height:"80%", maxWidth: "85%", minWidth:"330px", backgroundColor: "white"}}>
      <Grid item style={{textAlign: "center", height: "10%", position: "relative"}}>
        <Fab color="default" aria-label="delete" size="small" onClick={props.closeModal}
        style={{top: '-20px', right: '-20px', position: 'absolute', zIndex:"90"}}>
          <CloseIcon />
        </Fab>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Custom" {...a11yProps(0)} tabIndex="1"/>
          <Tab label="Search" {...a11yProps(1)} tabIndex="2"/>
          <Tab label="GIF" {...a11yProps(2)} tabIndex="3"/>
        </Tabs>
      </Grid>
      <Grid item style={{textAlign: "center", height: "90%"}}>
        {tabContent()}
      </Grid>
    </Grid>
  );
}

export default SearchModal;