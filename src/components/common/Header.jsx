import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'
import {Link, withRouter} from "react-router-dom"

function Header(props){

	const [state, setState] = React.useState({
	    top: false,
	    left: false,
	    bottom: false,
	    right: false,
	  });

	const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


	return(
		<React.Fragment>
			<AppBar position="static">
			  <Toolbar>
			    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
			      <MenuIcon />
			    </IconButton>
			    <Typography variant="h6">
			    	<Link to={"/"}>
			      		Home
			      	</Link>
			    </Typography>
			  </Toolbar>
			</AppBar>

			<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} style={{width: "50%", maxWidth:280}}>
				<div style={{width: 280}}>
					<List>
						<Link to={props.location.pathname+'/edit'}>
				    		<ListItem button>
								<ListItemText primary="Edit" />
							</ListItem>
						</Link>
					</List>
				</div>
		    </Drawer>

		</React.Fragment>
	)
}

export default withRouter(Header);