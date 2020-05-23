import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export default class Login extends Component {
	render() {
		return (
			<div className="login">
				<div className="card">
					<div className="card__header">
						<div className="logo">
							<img src={logo} alt="LoveFinderrz" className="logo__image" />
							<h1 className="logo__title">LoveFinderrz</h1>
						</div>
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
							/>
						</div>
						<div className="form__group">
							<label htmlFor="password">password:</label>
							<input
								name="password"
								type="password"
								required
								className="form__input"
							/>
						</div>
						<a href="/" className="btn form__submit">
							Login
						</a>
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
