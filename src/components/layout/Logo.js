import React from "react";

import logo from "../../assets/logo.png";

export default function Logo() {
	return (
		<div className="logo">
			<img src={logo} alt="LoveFinderrz" className="logo__image" />
			<h1 className="logo__title">LoveFinderrz</h1>
		</div>
	);
}
