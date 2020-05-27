import React, { Component } from "react";
import Sidebar from "./Sidebar";
import avatar from "../../assets/avatar.jpg";
import TextareaAutosize from "react-textarea-autosize";
import MessagesArea from "./MessagesArea";
import ChatTopBar from "./ChatTopBar";

class Chat extends Component {
	state = {
		typedmessage: "",
		recentChat: {
			avatar: avatar,
			name: "Ahmed Halim",
			message: "Hello, From The other side!",
			date: "11.04.3",
		},
		selectedChat: {
			username: "Ahmed Halim",
			subTitle: "Yesterday",
			messages: [
				{
					SentTime: "04:15pm",
					avatar: avatar,
					sentby: "Ahmed Halim",
					text:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sint saepe quae quo?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sint saepe quae quo?",
				},
				{
					SentTime: "04:15pm",
					avatar: avatar,
					sentby: "me",
					text:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sint saepe quae quo?",
				},
			],
		},
	};

	sendMessage = async e => {
		e.preventDefault();
		const { typedmessage } = this.state;
		if ((e.keyCode === 13) & (typedmessage.trim() !== "")) {
			await this.setState(prevState => ({
				selectedChat: {
					...prevState.selectedChat,
					messages: [
						...prevState.selectedChat.messages,
						{
							SentTime: "04:15pm",
							avatar: avatar,
							sentby: "me",
							text: this.state.typedmessage,
						},
					],
				},
			}));
			this.setState({ typedmessage: "" });
		}
	};

	render() {
		let { name, avatar, message, date } = this.state.recentChat;
		let { username, subTitle, messages } = this.state.selectedChat;

		return (
			<div className="chat">
				<Sidebar name={name} avatar={avatar} message={message} date={date} />

				<div className="chat__main">
					<ChatTopBar username={username} subTitle={subTitle} />
					<MessagesArea messages={messages} />

					<div className="chat__typingbar">
						<span className="btn btn-outline chat__typingbar_attachment">
							<i className="fa fa-paperclip"></i>
						</span>
						<form className="chat__typingbar_form">
							<TextareaAutosize
								className="chat__typingbar_input"
								placeholder="Write a message......"
								// ref={input => (this._typedmessage = input)}
								onKeyUp={this.sendMessage}
								value={this.state.typedmessage}
								onChange={e =>
									this.setState({ typedmessage: e.currentTarget.value })
								}
							/>
							<button
								type="submit"
								className="chat__typingbar_submit btn btn-outline"
								onClick={this.sendMessage}
							>
								<i className="fa fa-send"></i>
							</button>
						</form>

						<span className=" btn btn-outline chat__typingbar_emoji">
							<i className="fa fa-reddit-alien"></i>
						</span>
					</div>
				</div>
			</div>
		);
	}
}
export default Chat;
