import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import Logo from "../layout/Logo";
import axios from "axios";

class Login extends Component {
	state = {
		error: false,
		errorMessage: "",
		animation: "u-move-in-left",
		email: "",
		password: "",
	};

	static getDerivedStateFromProps(props, state) {
		// TODO: Improve this!
		try {
			if (props.location.state.email && state.email === "") {
				return {
					email: props.location.state.email,
				};
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	loginUser = e => {
		e.preventDefault();
		const { email, password } = this.state;
		const formData = new FormData();
		formData.append("email", email);
		formData.append("password", password);
		axios
			.post("http://lovefinderrz.test/api/v1/user/login", formData)
			.then(res => {
				console.log(res.data);
				this.animatedRedirect("");
			})
			.catch(error => {
				this.setState({
					error: true,
					errorMessage: error.response.data.message,
				});
			});
	};

	// Layout Methods

	animatedRedirect = (path = "") => {
		this.setState({
			animation: "u-move-out-left",
		});
		setTimeout(() => {
			if (path) {
				this.props.history.push(path);
			} else {
				this.props.changeAuthenticationStatus();
			}
		}, 750);
	};

	render() {
		const { email, password, error, errorMessage, animation } = this.state;

		return (
			<div className="login ">
				<div className={`card ${animation}`}>
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Login</h2>
					<form className="form">
						<div className="form__group">
							<label htmlFor="email">Email:</label>
							<input
								name="email"
								type="email"
								required
								className="form__input"
								value={email}
								onChange={e => this.setState({ email: e.target.value })}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">password:</label>
							<input
								name="password"
								type="password"
								required
								className="form__input"
								value={password}
								onChange={e => this.setState({ password: e.target.value })}
							/>
						</div>
						{error ? (
							<p className="paragraph paragraph-danger form__error">
								{errorMessage}
							</p>
						) : (
							<p className="u-mb-md-1"></p>
						)}
						<button
							className="btn form__submit"
							type="submit"
							onClick={this.loginUser}
						>
							Login
						</button>
					</form>

					<p className="paragraph">
						Not a user?{" "}
						<Link
							to="/register"
							className="link"
							onClick={e => {
								e.preventDefault();
								this.animatedRedirect("/register");
							}}
						>
							JOIN US!{" "}
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Login);
