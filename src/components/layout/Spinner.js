import React from "react";
import Loader from "react-loader-spinner";
import Backdrop from "./Backdrop";

export default function Spinner() {
	return (
		<Backdrop>
			<Loader
				type="TailSpin"
				color="#00BFFF"
				height={50}
				width={50}
				//  timeout={3000}
			/>
		</Backdrop>
	);
}
