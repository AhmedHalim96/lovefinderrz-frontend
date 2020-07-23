import React from "react";

export default function Backdrop(props) {
	return (
		<div
			className="backdrop"
			onClick={props.close}
			// onKeyPress={e => console.log("e")}
		>
			<div className="backdrop__center">{props.children}</div>
		</div>
	);
}
