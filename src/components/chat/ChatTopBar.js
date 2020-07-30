import React from "react";
import {
	changeSmallScreenLayout,
	toggleProfileModal,
} from "../../store/layout";
import { unSelectChat } from "../../store/chat";
import { useDispatch, useSelector } from "react-redux";
import { viewProfile } from "../../store/profile";

function ChatTopBar({ subTitle }) {
	const dispatch = useDispatch();
	const currentUserId = useSelector(state => state.auth.user.id);
	const chattedUser = useSelector(
		state => state.chat.selectedChat.users
	).filter(user => user.id !== currentUserId)[0];
	const chatTitle = chattedUser.name;
	const contacts = useSelector(state => state.auth.user.contacts);
	let status;
	if (contacts.length) {
		status = contacts.filter(contact => contact.id === chattedUser.id)[0]
			.status;
	}
	return (
		<div className="chat__topbar">
			<div className="chat__topbar_left">
				<button
					className="btn btn-outline chat__topbar_back"
					onClick={e => {
						dispatch(
							changeSmallScreenLayout({
								showChatArea: false,
								showSidebar: true,
							})
						);
						dispatch(unSelectChat());
					}}
				>
					<i className="fa fa-arrow-left"></i>
				</button>
				<div className="chat__topbar_title">
					<h2
						className="chat__topbar_title_user"
						onClick={e => {
							dispatch(viewProfile(chattedUser));
							dispatch(toggleProfileModal());
						}}
					>
						{chatTitle}
					</h2>
					<span
						className={`chat__topbar_title_status ${
							status === "online"
								? "chat__topbar_title_status-online"
								: "chat__topbar_title_status-offline"
						}`}
					>
						<i className="fa fa-circle"></i> {status}
					</span>
				</div>
			</div>
			<div className="chat__topbar_right">
				<span className="btn btn-outline">
					<i className="fa fa-search"></i>
				</span>
			</div>
		</div>
	);
}

export default ChatTopBar;
