import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { produce } from "immer";
import { registerUser } from "../../store/auth";
import Logo from "../layout/Logo";
import { startAnimatedRedirection } from "../../store/layout";

class Register extends Component {
	state = {
		formError: {},
		name: "",
		email: null,
		password: "",
		confirmPassword: "",
		avatar: "",
		avatarPreview: "",
	};

	static getDerivedStateFromProps(props, state) {
		try {
			const email = new URLSearchParams(props.location.search).get("email");
			if (email && state.email === null) {
				return {
					email: email,
				};
			}
			return null;
		} catch (error) {
			return null;
		}
	}

	confirmPasswordCheck = () => {
		const { password, confirmPassword } = this.state;
		const confirmPasswordError = !(password === confirmPassword);

		this.setState(
			produce(draftState => {
				draftState.formError.status = confirmPasswordError;
				draftState.formError.target = confirmPasswordError ? "password" : "";
				draftState.formError.message = confirmPasswordError
					? "Passwords don't match!"
					: "";
			})
		);
	};

	onChangeAvatar = e => {
		const targetFile = e.target.files[0];
		const fileSize = targetFile.size;
		if (fileSize > 2086666) {
			this.setState(
				produce(state => {
					state.formError.status = true;
					state.formError.target = "avatar";
					state.formError.message = "Image size is too big!";
				})
			);
			return;
		}

		this.setState(
			produce(state => {
				state.avatarPreview = URL.createObjectURL(targetFile);
				state.avatar = targetFile;
				state.formError = {};
			})
		);
	};

	render() {
		const {
			name,
			email,
			password,
			confirmPassword,
			avatar,
			avatarPreview,
			formError,
		} = this.state;
		const { exiting, initialAnimation, exitAnimation } = this.props.layout;
		const {
			error,
			history,
			startAnimatedRedirection,
			registerUser,
		} = this.props;

		return (
			<div className={`register ${exiting ? exitAnimation : initialAnimation}`}>
				<div className="card">
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Register</h2>
					<form
						className="form"
						encType="multipart/form-data"
						onSubmit={async e => {
							e.preventDefault();
							if (password === confirmPassword) {
								await registerUser(name, email, password, avatar);
								if (!error.errorOccurred)
									startAnimatedRedirection(
										"register",
										`/login${email ? `?email=${email}` : ""}`,
										history
									);
							}
						}}
					>
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
									backgroundImage: `url(${avatarPreview})`,
									backgroundSize: "cover",
								}}
							>
								<span>{avatarPreview === "" ? "your photo" : ""}</span>
							</label>
						</div>

						<div className="form__group">
							<label htmlFor="name">name:</label>
							<input
								name="name"
								type="text"
								required
								className="form__input"
								value={name}
								placeholder="Your Name"
								onChange={e => this.setState({ name: e.target.value })}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="email">Email:</label>
							<input
								name="email"
								type="email"
								required
								className={`form__input ${
									error.errorOccurred & (error.errorTarget === "email")
										? "form__input-danger"
										: ""
								}`}
								value={email ? email : ""}
								placeholder="Your Email"
								onChange={e => this.setState({ email: e.target.value })}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">Password:</label>
							<input
								name="password"
								type="password"
								required
								className={`form__input ${
									formError.status && formError.target === "password"
										? " form__input-danger"
										: ""
								}`}
								value={password}
								placeholder="Secret Password"
								onChange={async e => {
									await this.setState({ password: e.target.value });
									this.confirmPasswordCheck();
								}}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="confirm-password">Confirm Password:</label>
							<input
								name="confirm-password"
								type="password"
								required
								className={`form__input ${
									formError.status && formError.target === "password"
										? " form__input-danger"
										: ""
								}`}
								value={confirmPassword}
								placeholder="Secret Password"
								onChange={async e => {
									await this.setState({ confirmPassword: e.target.value });
									this.confirmPasswordCheck();
								}}
							/>{" "}
						</div>

						{error ? (
							<p className="paragraph paragraph-danger form__error">
								{error.errorOccurred
									? error.errorMessage
									: formError.status
									? formError.message
									: ""}
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
						<Link
							to="/"
							className="link"
							onClick={e => {
								e.preventDefault();
								startAnimatedRedirection(
									"register",
									`/login${email ? `?email=${email}` : ""}`,
									history
								);
							}}
						>
							LOGIN!
						</Link>
					</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	error: state.auth.errors.register,
	layout: state.layout.register,
});

export default connect(mapStateToProps, {
	registerUser,
	startAnimatedRedirection,
})(withRouter(Register));
