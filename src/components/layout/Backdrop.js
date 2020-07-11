import React from "react";

export default function Backdrop(props) {
	return (
		<div className="backdrop" onClick={props.close}>
			<div className="backdrop__center">{props.children}</div>
		</div>
	);
}
