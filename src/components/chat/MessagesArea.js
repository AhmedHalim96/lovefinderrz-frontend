import React, { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessagesArea({ messages }) {
	// for (let i = 0; i < 10; i++) {
	// 	messages = [...messages, messages[0], messages[1]];
	// }
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({
			behavior: "auto",
		});
	};

	useEffect(scrollToBottom, [messages]);
	return (
		<div className="chat__messages">
			{messages.map((message, id) => (
				<Message
					key={id}
					senderAvatar={message.avatar}
					senderName={message.sentby}
					messageText={message.text}
					sentTime={message.SentTime}
				/>
			))}
			<div ref={messagesEndRef} />
		</div>
	);
}
