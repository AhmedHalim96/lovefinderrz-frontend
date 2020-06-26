import React from "react";
import { connect } from "react-redux";
import { selectChat } from "../../store/chat";
import { changeSmallScreenLayout } from "../../store/layout";

function SidebarItem({
	chat,
	currentUserId,
	selectChat,
	selectedChatId,
	changeSmallScreenLayout,
}) {
	let { id, messages } = chat;
	let lastMessage = messages[0]; //TODO: Change this
	let sender = lastMessage.user;
	let name = chat.users[0].name;
	let date = lastMessage.created_at;
	let avatar = sender.avatar;
	let message = lastMessage.body;
	let selected = selectedChatId === id;

	return (
		<div
			className={`chat__sidebarItem ${
				selected ? "chat__sidebarItem-selected" : ""
			}`}
			onClick={async e => {
				console.log(chat);
				await selectChat(chat);
				changeSmallScreenLayout({ showChatArea: true, showSidebar: false });
			}}
		>
			<img
				src={`http://lovefinderrz.test/storage/avatars/${avatar}`}
				alt={name + "'s Avatar"}
				className="chat__sidebarItem_avatar"
			/>
			<div className="chat__sidebarItem_info">
				<div className="chat__sidebarItem_title">
					<h2 className="chat__sidebarItem_title_username">{name}</h2>
					<p className="chat__sidebarItem_title_date">{date}</p>
				</div>
				<p className="chat__sidebarItem_message">{`${
					currentUserId === sender.id ? "You: " : ""
				} ${message.substr(0, 20)} ${message.length > 20 ? "..." : ""}`}</p>
			</div>
		</div>
	);
}

const mapStateToProps = state => ({
	currentUserId: state.auth.user.id,
	selectedChatId: state.chat.selectedChat.id,
});

export default connect(mapStateToProps, {
	selectChat,
	changeSmallScreenLayout,
})(SidebarItem);
