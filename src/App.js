import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

class App extends Component {
	state = {
		authenticated: false,
	};
	render() {
		const authenticated = this.state.authenticated;
		return (
			<Switch>
				{authenticated ? null : (
					<Route path="/register">
						<Register />
					</Route>
				)}
				{authenticated ? null : (
					<Route path="/">
						<Login />
					</Route>
				)}
			</Switch>
		);
	}
}
export default App;
