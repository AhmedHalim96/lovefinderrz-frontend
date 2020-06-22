import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Logo from "../layout/Logo";

import { connect } from "react-redux";
import { registerUser } from "../../store/auth";
class Register extends Component {
	state = {
		error: false,
		errorTarget: "",
		errorMessage: "",
		redirect: false,
		animation: "u-move-in-right",
		avatar: null,
		avatarbg: "",
	};

	// Input Refs
	_email;
	_name;
	_password;
	_confirmPassword;

	_registerUser = e => {
		e.preventDefault();

		if (this._password.value === this._confirmPassword.value) {
			if (this.state.error) {
				this.setState({
					error: false,
					errorMessage: "",
				});
			}

			this.props
				.registerUser(
					this._name.value,
					this._email.value,
					this._password.value,
					this.state.avatar
				)
				.then(() => {
					this.setState({
						redirect: true,
					});
				})
				.catch(error => {
					console.log("DEBUG:", error.response.data);
					if (error.response.data.email) {
						this.setState({
							error: true,
							errorTarget: error.response.data.email ? "email" : "",
							errorMessage: error.response.data.email[0],
						});
					} else if (error.response.data.message) {
						this.setState({
							error: true,
							errorMessage: error.response.data.message,
						});
					}
				});
		} else {
			this.setState({
				error: true,
				errorTarget: "password",
				errorMessage: "Passwords Don't match",
			});
		}
	};

	// Layout methods
	animatedRedirect = e => {
		e.preventDefault();
		this.setState({
			animation: "u-move-out-right",
		});

		setTimeout(() => {
			this.setState({ redirect: true });
		}, 750);
	};

	onChangeAvatar = e => {
		const fileSize = e.target.files[0].size;
		if (fileSize > 2086666) {
			this.setState({
				error: true,
				errorMessage: "image is too large",
			});
			return;
		}
		this.setState({
			avatarbg: URL.createObjectURL(e.target.files[0]),
			avatar: e.target.files[0],
			error: false,
		});
	};

	render() {
		let {
			error,
			errorTarget,
			errorMessage,
			animation,
			redirect,
			avatarbg,
		} = this.state;
		return (
			<div className={`register ${animation}`}>
				{redirect ? (
					<Redirect
						to={{
							pathname: "/login",
							state: { email: this._email.value },
						}}
					/>
				) : null}
				<div className="card">
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Register</h2>
					<form className="form" encType="multipart/form-data">
						<div className="form__group">
							<input
								name="avatar"
								type="file"
								id="avatar"
								className="form__file"
								accept="image/*"
								onChange={this.onChangeAvatar}
							/>
							<label
								htmlFor="avatar"
								style={{
									backgroundImage: `url(${avatarbg})`,
									backgroundSize: "cover",
								}}
							>
								<span>{avatarbg === "" ? "your photo" : ""}</span>
							</label>
						</div>

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
								className={`form__input ${
									error & (errorTarget === "email") ? "form__input-danger" : ""
								}`}
								ref={input => (this._email = input)}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">Password:</label>
							<input
								name="password"
								type="password"
								required
								className={`form__input ${
									error & (errorTarget === "password")
										? " form__input-danger"
										: ""
								}`}
								ref={input => (this._password = input)}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input
								name="confirm-password"
								type="password"
								required
								className={`form__input ${
									error & (errorTarget === "password")
										? " form__input-danger"
										: ""
								}`}
								ref={input => (this._confirmPassword = input)}
							/>{" "}
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
							onClick={e => {
								e.preventDefault();
								this.props.registerUser(
									this._name.value,
									this._email.value,
									this._password.value,
									this.state.avatar
								);
							}}
						>
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

export default connect(null, { registerUser })(withRouter(Register));
