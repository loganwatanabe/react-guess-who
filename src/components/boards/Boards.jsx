import React from 'react';
import Board from './Board';
import { Switch, Route, useRouteMatch} from "react-router-dom";

function Boards(props) {

	let { path, url } = useRouteMatch();

	console.log(path)

	return (
		<Switch>
			<Route exact path={path+'/new'}>
				<h3>new</h3>
			</Route>
			<Route path={path+'/:id'}>
				<Board/>
			</Route>
		</Switch>
	);
}

export default Boards;