import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {List, ListItem, ListItemText, Button} from '@material-ui/core'
import {homeBoards, getUsersBoards} from '../api/api-server'


function TermsOfService(props){

	// const [error, setError] = useState(null);
	// const [isLoaded, setIsLoaded] = useState(false);
  const [boards, setBoards] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run oncea
	// similar to componentDidMount()
  useEffect(() => {
    
    }, [])



  return (
    <div>
      MYACCOUNT
    </div>
  );
}

export default TermsOfService;