import React from "react";
import moment from "moment";
import { avatarURL } from "../../store/apiConfig";

export default function Message({
	senderAvatar,
	senderName,
	messageText,
	sentTime,
	byCurrentUser,
	isLastMessageBySameUser,
}) {
	const messageTime = moment(sentTime);

	return (
		<div
			className={`chat__message ${byCurrentUser ? "chat__message-right" : ""} ${
				isLastMessageBySameUser ? "chat__message-last" : ""
			}`}
		>
			<img
				src={`${avatarURL}/${senderAvatar}`}
				alt={senderName + " avatar"}
				className={`chat__message_avatar ${
					isLastMessageBySameUser ? "chat__message_avatar-last" : ""
				}`}
			/>
			<div
				className={`chat__message_body ${
					byCurrentUser ? "chat__message_body-right" : "chat__message_body-left"
				} ${isLastMessageBySameUser ? "chat__message_body-last" : ""}`}
			>
				{/* <span className="chat__message_sender">{senderName}</span> */}
				<p className="chat__message_content paragraph">{messageText}</p>
				<span className="chat__message_time">
					{`${
						messageTime.hours() > 12
							? messageTime.hours() - 12
							: messageTime.hours()
					}:${messageTime.minutes()}${messageTime.hours() >= 12 ? "pm" : "am"}`}
				</span>
			</div>
		</div>
	);
}
