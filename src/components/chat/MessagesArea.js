import React, { useEffect, useRef } from "react";
import Message from "./Message";
import { connect } from "react-redux";

function MessagesArea({ messages, currentUserId }) {
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({
			behavior: "auto",
		});
	};

	useEffect(scrollToBottom, [messages]);
	return (
		<div className="chat__messages">
			{messages.map((message, index) => {
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

const mapStateToProps = state => ({
	currentUserId: state.auth.user.id,
});

export default connect(mapStateToProps, {})(MessagesArea);
