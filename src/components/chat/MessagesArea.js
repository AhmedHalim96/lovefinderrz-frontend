import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import { useSelector } from "react-redux";

function MessagesArea() {
	const currentUserId = useSelector(state => state.auth.user.id);
	const messages = useSelector(state => state.chat.selectedChat.messages);
	let messagesReversed = [...messages].reverse();

	return (
		<React.Fragment>
			<ScrollToBottom
				className="chat__messages"
				followButtonClassName="chat__messages_scroll-btn"
			>
				{messagesReversed.map((message, index) => {
					const { id, avatar, name } = message.user;
					let isLastMessageBySameUser = false;
					if (index === messagesReversed.length - 1)
						isLastMessageBySameUser = true;
					else
						isLastMessageBySameUser =
							id !== messagesReversed[index + 1].user.id;

					return (
						<Message
							key={message.id}
							senderAvatar={avatar}
							senderName={name}
							messageText={message.body}
							sentTime={message.created_at}
							byCurrentUser={currentUserId === id}
							isLastMessageBySameUser={isLastMessageBySameUser}
						/>
					);
				})}
			</ScrollToBottom>
		</React.Fragment>
	);
}

export default MessagesArea;
