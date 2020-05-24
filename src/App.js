import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Chat from "./components/chat/Chat";

class App extends Component {
	state = {
		authenticated: false,
	};
	render() {
		const authenticated = this.state.authenticated;
		return (
			<Switch>
				<Route path="/chat">
					<Chat />
				</Route>
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
