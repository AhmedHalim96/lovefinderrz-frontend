import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectChat } from "../../store/chat";
import moment from "moment";
import { changeSmallScreenLayout } from "../../store/layout";

function SidebarItem({ chat }) {
	const dispatch = useDispatch();
	const currentUserId = useSelector(state => state.auth.user.id);
	const selectedChatId = useSelector(state => state.chat.selectedChat.id);

	let { id, messages } = chat;
	let lastMessage = messages[0];
	let lastMessageTime;
	if (messages.length) {
		const lastMessageMoment = moment(lastMessage.created_at);
		if (moment().day() !== lastMessageMoment.day()) {
			lastMessageTime = `${
				lastMessageMoment.month() + 1
			}.${lastMessageMoment.date()}`;
		} else {
			lastMessageTime = `${
				lastMessageMoment.hour() > 12
					? lastMessageMoment.hour() - 12
					: lastMessageMoment.hour()
			}:${lastMessageMoment.minutes()}${
				lastMessageMoment.hour() >= 12 ? "pm" : "am"
			}`;
		}
	}
	let name = chat.users[0].name;
	let avatar = chat.users[0].avatar;
	let selected = selectedChatId === id;

	return (
		<div
			className={`chat__sidebarItem ${
				selected ? "chat__sidebarItem-selected" : ""
			}`}
			onClick={async e => {
				if (selectedChatId !== chat.id) {
					await dispatch(selectChat(chat));
					dispatch(
						changeSmallScreenLayout({ showChatArea: true, showSidebar: false })
					);
				}
			}}
		>
			<img
				src={`http://lovefinderrz.test/storage/avatars/${avatar}`}
				alt={name + "'s Avatar"}
				className="chat__sidebarItem_avatar"
			/>
			<div className="chat__sidebarItem_right">
				<div className="chat__sidebarItem_top">
					<h2 className="chat__sidebarItem_title">{name}</h2>
					<p className="chat__sidebarItem_date">
						{messages.length ? lastMessageTime : ""}
					</p>
				</div>
				<div className="chat__sidebarItem_bottom">
					<p className="chat__sidebarItem_message">
						{messages.length
							? `${
									currentUserId === lastMessage.user.id ? "You: " : ""
							  } ${lastMessage.body.substr(0, 20)} ${
									lastMessage.body.length > 20 ? "..." : ""
							  }`
							: "No Messages"}
					</p>
					<span className="chat__sidebarItem_unread">12</span>
				</div>
			</div>
		</div>
	);
}

export default SidebarItem;
