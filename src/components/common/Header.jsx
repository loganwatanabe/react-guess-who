import React from 'react';
import {AppBar, Toolbar, IconButton, Typography, Drawer} from '@material-ui/core'
import {Menu as MenuIcon} from '@material-ui/icons'


function Header(){

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
			      Header
			    </Typography>
			  </Toolbar>
			</AppBar>
			<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
		      hiiiiiiiiiiiiiii
		    </Drawer>
		</React.Fragment>
	)
}

export default Header;