import React, { Component } from "react";
import Sidebar from "./Sidebar";
import MessagesArea from "./MessagesArea";
import ChatTopBar from "./ChatTopBar";
import { connect } from "react-redux";
import { getChats } from "../../store/chat";
import Spinner from "../layout/Spinner";
import TypingBar from "./TypingBar";

class Chat extends Component {
	componentDidMount = () => {
		this.props.getChats();
	};

	render() {
		const { loading, selectedChat, showChatArea } = this.props;

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
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.chat.loading,
	selectedChat: state.chat.selectedChat,
	showChatArea: state.layout.chat.smallScreensLayout.showChatArea,
});

export default connect(mapStateToProps, { getChats })(Chat);
