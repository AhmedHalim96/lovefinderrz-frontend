import React, { Component } from "react";
import Sidebar from "./Sidebar";
import avatar from "../../assets/avatar.jpg";
import TextareaAutosize from "react-textarea-autosize";
import MessagesArea from "./MessagesArea";
import ChatTopBar from "./ChatTopBar";
import { connect } from "react-redux";
import { getChats } from "../../store/chat";
import Spinner from "../layout/Spinner";

class Chat extends Component {
	componentDidMount = () => {
		this.props.getChats();
	};

	state = {
		typedMessage: "",
	};

	sendMessage = async e => {
		e.preventDefault();
		const { typedMessage } = this.state;
		if (
			((e.keyCode === 13 && !e.shiftKey) | (e.type === "click")) &
			(typedMessage.trim() !== "")
		) {
			await this.setState(prevState => ({
				selectedChat: {
					...prevState.selectedChat,
					messages: [
						...prevState.selectedChat.messages,
						{
							SentTime: "04:15pm",
							avatar: avatar,
							sentby: "me",
							text: this.state.typedMessage.trim(),
						},
					],
				},
			}));
			this.setState({ typedMessage: "" });
		}
	};

	render() {
		const { typedMessage } = this.state;
		const { loading, chats, selectedChat, showChatArea } = this.props;

		if (loading) return <Spinner />;

		return (
			<div className="chat">
				<Sidebar chats={chats} />

				<div
					className={`chat__main chat__main_phone-port-${
						showChatArea ? "show" : "hide"
					}`}
				>
					{selectedChat.id ? (
						<React.Fragment>
							<ChatTopBar
								chatTitle={selectedChat.users[0].name}
								subTitle={"subTitle"}
							/>
							<MessagesArea messages={selectedChat.messages} />

							<div className="chat__typingbar">
								<span className="btn btn-outline chat__typingbar_attachment">
									<i className="fa fa-paperclip"></i>
								</span>
								<form className="chat__typingbar_form">
									<TextareaAutosize
										className="chat__typingbar_input"
										placeholder="Write a message......"
										onKeyUpCapture={this.sendMessage}
										value={typedMessage}
										onChange={e =>
											this.setState({ typedMessage: e.currentTarget.value })
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
						</React.Fragment>
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.chat.loading,
	chats: state.chat.chats,
	selectedChat: state.chat.selectedChat,
	showChatArea: state.layout.chat.smallScreensLayout.showChatArea,
});

export default connect(mapStateToProps, { getChats })(Chat);
