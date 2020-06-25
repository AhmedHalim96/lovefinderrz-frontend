import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../layout/Logo";
import { connect } from "react-redux";
import { loginInUser } from "../../store/auth";
import { startAnimatedRedirection } from "../../store/layout";
import Spinner from "../layout/Spinner";

class Login extends Component {
	state = {
		email: null,
		password: "",
		rememberMe: true,
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

	render() {
		const { email, password, rememberMe } = this.state;
		const { error, startAnimatedRedirection, history, loading } = this.props;
		const { exiting, initialAnimation, exitAnimation } = this.props.layout;

		return (
			<div className="login">
				{loading ? <Spinner /> : null}
				<div className={`card ${exiting ? exitAnimation : initialAnimation}`}>
					<div className="card__header">
						<Logo />
					</div>
					<h2 className="card__title"> Login</h2>
					<form
						className="form"
						onSubmit={e => {
							e.preventDefault();
							this.props.loginInUser(email, password, rememberMe);
						}}
					>
						<div className="form__group">
							<label htmlFor="email">Email:</label>
							<input
								name="email"
								type="email"
								required
								className={`form__input ${
									error.errorOccurred ? "form__input-danger" : ""
								}`}
								value={email ? email : ""}
								placeholder="Your Email"
								onChange={e => this.setState({ email: e.target.value })}
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">password:</label>
							<input
								name="password"
								type="password"
								required
								className={`form__input ${
									error.errorOccurred ? "form__input-danger" : ""
								}`}
								value={password}
								placeholder="Your Super Secret Password"
								onChange={e => this.setState({ password: e.target.value })}
							/>
							<div className="form__group form__group-checkbox">
								<input
									type="checkbox"
									name="remember-me"
									className="form__checkbox"
									// value={rememberMe}
									// onChange={}
								/>
								<label
									htmlFor="remember-me"
									onClick={e => this.setState({ rememberMe: !rememberMe })}
								>
									{rememberMe ? <i className="fa fa-check"></i> : ""}
								</label>
								<p>Remember Me</p>
							</div>
						</div>
						{error.errorOccurred ? (
							<p className="paragraph paragraph-danger form__error">
								{error.errorMessage}
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
							onClick={e => {
								e.preventDefault();
								startAnimatedRedirection(
									"login",
									`/register${email ? `?email=${email}` : ""}`,
									history
								);
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
const mapStateToProps = state => ({
	error: state.auth.errors.login,
	layout: state.layout.login,
	loading: state.auth.loading,
});

export default connect(mapStateToProps, {
	loginInUser,
	startAnimatedRedirection,
})(withRouter(Login));
