import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

function MessagesArea() {
	const currentUserId = useSelector(state => state.auth.user.id);
	const messages = useSelector(state => state.chat.selectedChat.messages);

	const messagesEndRef = useRef(null);
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({
			behavior: "auto",
		});
	};

	let messagesReversed = [...messages].reverse();

	useEffect(scrollToBottom, [messages]);
	return (
		<div className="chat__messages">
			{messagesReversed.map((message, index) => {
				const { id, avatar, name } = message.user;
				return (
					<Message
						key={message.id}
						senderAvatar={avatar}
						senderName={name}
						messageText={message.body}
						sentTime={message.created_at}
						byCurrentUser={currentUserId === id}
					/>
				);
			})}
			<div ref={messagesEndRef} />
		</div>
	);
}

export default MessagesArea;
