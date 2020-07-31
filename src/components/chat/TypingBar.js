import React, { useState, useEffect } from "react";
import echo from "../../laravelEcho";
import { sendMessage } from "../../store/chat";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

export default function TypingBar() {
	const dispatch = useDispatch();
	const selectedChat = useSelector(state => state.chat.selectedChat);
	const currentUser = useSelector(state => state.auth.user);
	const selectedContact = selectedChat.users.filter(
		user => user.id !== currentUser.id
	)[0];
	const [typedMessage, setTypedMessage] = useState("");
	const [isTyping, setIsTyping] = useState({});
	const sendMessageHandler = async e => {
		e.preventDefault();
		if (
			((e.keyCode === 13 && !e.shiftKey) | (e.type === "click")) &
			(typedMessage.trim() !== "")
		) {
			await dispatch(
				sendMessage({
					chat_id: selectedChat.id,
					body: typedMessage,
				})
			);
			setTypedMessage("");
		}
	};

	const typing = () => {
		let channel = echo.private("chat." + selectedChat.id);
		// BUG: istyping show up allover
		setTimeout(() => {
			channel.whisper("typing", {
				user: {
					id: currentUser.id,
					name: currentUser.name,
				},
			});
		}, 300);
	};
	useEffect(() => {
		echo.private("chat." + selectedChat.id).listenForWhisper("typing", e => {
			setIsTyping(e.user);
			// remove is typing indicator after 0.9s
			setTimeout(() => setIsTyping({}), 900);
		});
	}, [selectedChat.id]);

	return (
		<React.Fragment>
			{isTyping && isTyping.id === selectedContact.id ? (
				<span className="chat__isTyping">
					{isTyping.name /*.split(" ")[0]*/} is typing.....
				</span>
			) : (
				<span style={{ padding: "1rem" }}></span>
			)}
			<div className="chat__typingbar">
				<span className="btn btn-outline chat__typingbar_attachment">
					<i className="fa fa-paperclip"></i>
				</span>
				<form className="chat__typingbar_form">
					<TextareaAutosize
						className="chat__typingbar_input"
						placeholder="Write a message......"
						onKeyUpCapture={sendMessageHandler}
						value={typedMessage}
						onChange={e => {
							setTypedMessage(e.currentTarget.value);
							typing();
						}}
					/>
					<button
						type="submit"
						className="chat__typingbar_submit btn btn-outline"
						onClick={sendMessageHandler}
					>
						<i className="fa fa-send"></i>
					</button>
				</form>

				<span className=" btn btn-outline chat__typingbar_emoji">
					<i className="fa fa-reddit-alien"></i>
				</span>
			</div>
		</React.Fragment>
	);
}
