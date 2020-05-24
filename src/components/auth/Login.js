import React, { Component } from "react";

import { Link, withRouter } from "react-router-dom";
import Logo from "../layout/Logo";
class Login extends Component {
	state = {
		error: false,
		errorMessage: "",
		animation: "u-move-in-left",
	};

	animatedRedirect = e => {
		e.preventDefault();
		this.setState({
			animation: "u-move-out-left",
		});

		setTimeout(() => {
			this.props.history.push("/register");
		}, 750);
	};

	// Refs
	_email;
	_password;

	render() {
		let { error, errorMessage, animation } = this.state;

		return (
			<div className="login ">
				<div className={`card ${animation}`}>
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
						<Link
							to="/register"
							className="link"
							onClick={this.animatedRedirect}
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
