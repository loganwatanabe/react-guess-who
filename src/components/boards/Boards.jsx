import React from 'react';
import Board from './Board';
import InputBoard from './InputBoard';
import { Switch, Route, useRouteMatch} from "react-router-dom";

function Boards(props) {

	let { path, url } = useRouteMatch();


	return (
		<Switch>
			<Route exact path={path+'/new'}>
				<InputBoard new/>
			</Route>
			<Route exact path={path+'/:id/edit'}>
				<InputBoard edit/>
			</Route>
			<Route path={path+'/:id'}>
				<Board/>
			</Route>
		</Switch>
	);
}

export default Boards;