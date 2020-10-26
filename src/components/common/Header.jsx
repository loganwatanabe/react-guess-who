import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@material-ui/core'
import {Menu as MenuIcon, AccountCircle} from '@material-ui/icons'
import {Link, withRouter, useHistory} from "react-router-dom"

import firebase from '../../firebase/index'

function Header(props){

	const history=useHistory()

	const [state, setState] = useState({
	    top: false,
	    left: false,
	    bottom: false,
	    right: false,
	  });

	// const [right,setRight] = useState(false)
	// const [left,setleft] = useState(false)



	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
  	}, [])



	const toggleDrawer = (anchor, open) => (event) => {
	console.log("close menu")
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  	const loginIcon = () =>{

  		if(props.user){
  			console.log(props.user)
  			return(
  				<IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer('right', true)}
                color="inherit"
                style={{fontSize: "10px"}}
              	>
                <AccountCircle />
                </IconButton>
             )
  		}else{
  			return(
  				<Link to={'/login'} style={{fontSize: "10px"}}>
                LOGIN
                </Link>
  			)
  		}
  	}

  	const logout = () => {
  		firebase.signout(()=>{
  			setState({ ...state, ['right']: false });
  			history.push('/')
  		})
  	}

  	const leftDrawerContent = () => {
  			return(
  				<List>
					<Link to={props.location.pathname+'/edit'}>
			    		<ListItem button>
							<ListItemText primary="Edit" />
						</ListItem>
					</Link>
				</List>
			)
  	}

  	const rightDrawerContent = () =>{

  	  	if(props.user){
  			return(
  				<List>
					<Link to={'/myboards'}>
			    		<ListItem button>
							<ListItemText primary="My Boards" />
						</ListItem>
					</Link>
					<Link to={'/myaccount'}>
			    		<ListItem button>
							<ListItemText primary="My Account" />
						</ListItem>
					</Link>
					<ListItem/>
					<Link>
			    		<ListItem button onClick={logout}>
							<ListItemText primary="LOGOUT" />
						</ListItem>
					</Link>
				</List>
  			)
  		}else{
  			console.log("not logged in")
  			return firebase.signin
  		}
  	}


	return(
		<React.Fragment>
			<AppBar position="static">
			  <Toolbar>
			    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
			      <MenuIcon />
			    </IconButton>
			    <Typography variant="h6" style={{flexGrow: "1", textAlign: "center"}}>
			    	<Link to={"/"}>
			      		GuessWhom
			      	</Link>
			    </Typography>
			    {loginIcon()}
			  </Toolbar>
			</AppBar>

			<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} style={{width: "50%", maxWidth:280}}>
				<div style={{width: 280}}>
					{leftDrawerContent()}
				</div>
		    </Drawer>
		    <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)} style={{width: "50%", maxWidth:280}}>
				<div style={{width: 280}}>
					{rightDrawerContent()}
				</div>
		    </Drawer>

		</React.Fragment>
	)
}

export default withRouter(Header);