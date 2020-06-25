import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Chat from "./components/chat/Chat";
import { connect } from "react-redux";
import { fetchUserFromLocal } from "./store/auth";
import Spinner from "./components/layout/Spinner";

class App extends Component {
	componentDidMount() {
		this.props.fetchUserFromLocal();
	}

	render() {
		const { authenticated, loading } = this.props;
		if (loading) return <Spinner />;
		return (
			<Switch>
				{/*UnAuthenticated Routes*/}
				{authenticated ? null : (
					<Route path="/register">
						<Register />
					</Route>
				)}
				{authenticated ? null : (
					<Route path="/login">
						<Login />
					</Route>
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
						<Chat />
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

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { fetchUserFromLocal })(App);
