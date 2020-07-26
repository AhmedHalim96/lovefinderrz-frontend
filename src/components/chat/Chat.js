import React, { Component } from "react";
import Sidebar from "./Sidebar";
import echo from "../../laravelEcho";
import MessagesArea from "./MessagesArea";
import ChatTopBar from "./ChatTopBar";
import { connect } from "react-redux";
import { getChats, addMessage, addChat } from "../../store/chat";
import Spinner from "../layout/Spinner";
import TypingBar from "./TypingBar";
import ProfileModal from "./ProfileModal";
import SideMenu from "./SideMenu";
import EmailModal from "./EmailModal";

class Chat extends Component {
	componentDidMount = () => {
		this.props.getChats();

		echo.channel("newChat").listen("NewChat", res => {
			this.props.addChat(res.new_chat);
		});
	};

	render() {
		const {
			loading,
			selectedChat,
			showChatArea,
			showProfileModal,
			showSideMenu,
			showEmailModal,
			loaded,
		} = this.props;

		if (loading && !loaded) return <Spinner />;

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
				{showProfileModal ? <ProfileModal /> : null}
				{showSideMenu ? <SideMenu /> : null}
				{showEmailModal ? <EmailModal /> : null}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.chat.loading,
	chats: state.chat.chats,
	loaded: state.chat.loaded,
	selectedChat: state.chat.selectedChat,
	showChatArea: state.layout.chat.smallScreensLayout.showChatArea,
	showProfileModal: state.layout.chat.showProfileModal,
	showEmailModal: state.layout.emailModal.isVisible,
	showSideMenu: state.layout.sideMenu.isVisible,
});

export default connect(mapStateToProps, { getChats, addMessage, addChat })(
	Chat
);
