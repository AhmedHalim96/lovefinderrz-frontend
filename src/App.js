import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Chat from "./components/chat/Chat";

class App extends Component {
	state = {
		authenticated: false,
		user: null,
		token: null,
	};

	changeAuthenticationStatus = () => {
		this.setState(prevState => ({
			authenticated: !prevState.authenticated,
		}));
	};

	render() {
		const authenticated = this.state.authenticated;
		return (
			<Switch>
				{/*UnAuthenticated Routes*/}
				{authenticated ? null : (
					<Route path="/register">
						<Register />
					</Route>
				)}
				{authenticated ? null : (
					<Route
						path="/login"
						render={props => (
							<Login
								{...props}
								changeAuthenticationStatus={this.changeAuthenticationStatus}
							/>
						)}
					/>
				)}
				{authenticated ? null : (
					<Route path="/">
						<Redirect
							to={{
								pathname: "/login",
							}}
						/>
					</Route>
				)}

				{/*Authenticated Routes*/}
				{authenticated ? (
					<Route path="/chat">
						<Chat
							changeAuthenticationStatus={this.changeAuthenticationStatus}
						/>
					</Route>
				) : null}
				{authenticated ? (
					<Route path="/">
						<Redirect to="/chat" />
					</Route>
				) : null}
			</Switch>
		);
	}
}
export default App;
