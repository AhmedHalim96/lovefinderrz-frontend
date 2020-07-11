import React, { Component } from "react";
import Sidebar from "./Sidebar";
import echo from "../../laravelEcho";
import MessagesArea from "./MessagesArea";
import ChatTopBar from "./ChatTopBar";
import { connect } from "react-redux";
import { getChats, addMessage } from "../../store/chat";
import Spinner from "../layout/Spinner";
import TypingBar from "./TypingBar";
import Profile from "./Profile";

class Chat extends Component {
	componentDidMount = async () => {
		await this.props.getChats();
		this.props.chats.map(chat =>
			echo.channel("chat_" + chat.id).listen("NewMessage", res => {
				this.props.addMessage(res.message, res.messageSender);
			})
		);
	};

	render() {
		const {
			loading,
			selectedChat,
			showChatArea,
			showProfileModal,
			currentUser,
		} = this.props;

		if (loading) return <Spinner />;

		return (
			<div className="chat">
				<Sidebar />

				<div
					className={`chat__main chat__main_phone-port-${
						showChatArea ? "show" : "hide"
					}`}
				>
					{selectedChat.id ? (
						<React.Fragment>
							<ChatTopBar subTitle={"subTitle"} />
							<MessagesArea messages={selectedChat.messages} />
							<TypingBar />
						</React.Fragment>
					) : null}
				</div>
				{showProfileModal ? <Profile /> : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.chat.loading,
	currentUser: state.auth.user,
	chats: state.chat.chats,
	selectedChat: state.chat.selectedChat,
	showChatArea: state.layout.chat.smallScreensLayout.showChatArea,
	showProfileModal: state.layout.chat.showProfileModal,
});

export default connect(mapStateToProps, { getChats, addMessage })(Chat);
