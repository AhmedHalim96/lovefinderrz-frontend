import React from "react";

export default function Message({
	senderAvatar,
	senderName,
	messageText,
	sentTime,
}) {
	return (
		<div
			className={`chat__message ${
				senderName === "me" ? "chat__message-right" : ""
			}`}
		>
			{/* <img
				src={senderAvatar}
				alt={senderName + " avatar"}
				className="chat__message_avatar"
			/> */}
			<div
				className={`chat__message_body ${
					senderName === "me"
						? "chat__message_body-right"
						: "chat__message_body-left"
				}`}
			>
				{/* <h2 className="chat__message_sender">{senderName}</h2> */}
				<p className="chat__message_content paragraph">{messageText}</p>
				<span className="chat__message_time">{sentTime}</span>
			</div>
		</div>
	);
}
