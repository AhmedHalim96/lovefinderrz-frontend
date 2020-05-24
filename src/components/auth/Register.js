import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../layout/Logo";

class Register extends Component {
	state = {
		error: false,
		errorMessage: "",
		animation: "u-move-in-right",
	};

	// Refs
	_email;
	_name;
	_password;
	_confirmPassword;

	animatedRedirect = e => {
		e.preventDefault();
		this.setState({
			animation: "u-move-out-right",
		});

		setTimeout(() => {
			this.props.history.push("/");
		}, 750);
	};

	registerUser = e => {
		e.preventDefault();

		if (this._password.value === this._confirmPassword.value) {
			if (this.state.error) {
				this.setState({
					error: false,
					errorMessage: "",
				});
			}
			console.log("matched");
		} else {
			this.setState({ error: true, errorMessage: "Passwords Don't match" });
		}
	};

	render() {
		let { error, errorMessage, animation } = this.state;
		return (
			<div className={`register ${animation}`}>
				<div className="card">
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Register</h2>
					<form onSubmit={this.registerUser} className="form">
						<div className="form__group">
							<label htmlFor="name">name:</label>
							<input
								name="name"
								type="text"
								required
								className="form__input"
								ref={input => (this._name = input)}
							/>
						</div>
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
							<label htmlFor="password">Password:</label>
							<input
								name="password"
								type="password"
								required
								className={
									error ? "form__input form__input-danger" : "form__input "
								}
								ref={input => (this._password = input)}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input
								name="confirm-password"
								type="password"
								required
								className={
									error ? "form__input form__input-danger" : "form__input "
								}
								ref={input => (this._confirmPassword = input)}
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
							Register
						</button>
					</form>
					<p className="paragraph">
						Already a user?{" "}
						<Link to="/" className="link" onClick={this.animatedRedirect}>
							LOGIN!{" "}
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Register);
