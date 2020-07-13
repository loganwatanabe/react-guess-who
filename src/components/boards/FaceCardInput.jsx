import React, {useState, useEffect} from 'react';
import {Paper, Card, CardMedia, CardActionArea, CardContent, Typography, ButtonBase, Grid, TextField} from '@material-ui/core'


function FaceCardInput(props){

  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [name, setName] = useState(props.data.name);

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


  return (
    <Grid item xs={6} sm={3} md={2}>
      <Card style={{width: "100%", minHeight: 240, maxHeight: 300, textAlign: 'center'}}>
          {displayImage()}
          <TextField label="Image URL" variant="outlined" value={props.data.url} onChange={(e)=>fieldChange("url",e)}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <TextField label="Name" variant="outlined" value={props.data.name} onChange={(e)=>fieldChange("name",e)}/>
            </Typography>
          </CardContent>
      </Card>
    </Grid>
  );
}

export default FaceCardInput;