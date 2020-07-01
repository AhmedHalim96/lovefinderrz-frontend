import React, { useState } from "react";
import { sendMessage } from "../../store/chat";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

export default function TypingBar() {
	const dispatch = useDispatch();
	const selectedChatId = useSelector(state => state.chat.selectedChat.id);
	const [typedMessage, setTypedMessage] = useState("");

	const sendMessageHandler = async e => {
		e.preventDefault();
		if (
			((e.keyCode === 13 && !e.shiftKey) | (e.type === "click")) &
			(typedMessage.trim() !== "")
		) {
			await dispatch(
				sendMessage({
					chat_id: selectedChatId,
					body: typedMessage,
				})
			);
			setTypedMessage("");
		}
	};
	return (
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
					onChange={e => setTypedMessage(e.currentTarget.value)}
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
	);
}
