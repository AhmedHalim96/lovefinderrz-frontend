import React from "react";
import Loader from "react-loader-spinner";

export default function Spinner() {
	return (
		<div className="backdrop">
			<div className="backdrop__center">
				<Loader
					type="TailSpin"
					color="#00BFFF"
					height={50}
					width={50}
					//  timeout={3000}
				/>
			</div>
		</div>
	);
}
