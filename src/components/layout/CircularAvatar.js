import React from "react";
import { avatarURL } from "../../store/apiConfig";

export default function CircularAvatar({ className, avatarImage, size }) {
	const avatar = avatarURL + "/" + avatarImage;
	return (
		<div
			className={`circularAvatar ${className}`}
			style={{
				backgroundImage: `url(${avatar})`,
				minWidth: size,
				minHeight: size,
			}}
		></div>
	);
}
