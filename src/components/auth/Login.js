import React, { Component } from "react";

import { Link } from "react-router-dom";
import Logo from "../layout/Logo";
export default class Login extends Component {
	state = {
		error: false,
		errorMessage: "",
	};

	// Refs
	_email;
	_password;

	render() {
		let { error, errorMessage } = this.state;

		return (
			<div className="login">
				<div className="card">
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Login</h2>
					<form onSubmit={console.log("object")} className="form">
						<div className="form__group">
							<label htmlFor="email">Email:</label>
							<input
								name="email"
								type="email"
								required
								className="form__input"
								ref={input => (this._email = input)}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">password:</label>
							<input
								name="password"
								type="password"
								required
								className="form__input"
								ref={input => (this._email = input)}
							/>
						</div>
						{error ? (
							<p className="paragraph paragraph-danger form__error">
								{errorMessage}
							</p>
						) : (
							<p className="u-mb-md-1"></p>
						)}
						<button className="btn form__submit" type="submit">
							Login
						</button>
					</form>

					<p className="paragraph">
						Not a user?{" "}
						<Link to="/register" className="link">
							JOIN US!{" "}
						</Link>
					</p>
				</div>
			</div>
		);
	}
}
