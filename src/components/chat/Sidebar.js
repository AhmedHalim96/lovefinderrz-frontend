import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector, useDispatch } from "react-redux";
import { toggleProfileModal } from "../../store/layout";
import { viewProfile } from "../../store/profile";

function Sidebar() {
	const dispatch = useDispatch();
	const chats = useSelector(state => state.chat.chats);
	const currentUser = useSelector(state => state.auth.user);
	const showSidebar = useSelector(
		state => state.layout.chat.smallScreensLayout.showSidebar
	);

	return (
		<div
			className={`chat__sidebar chat__sidebar_phone-port-${
				showSidebar ? "show" : "hide"
			}`}
		>
			<div className="chat__sidebar_top">
				<span
					className="btn btn-outline chat__sidebar_toggler"
					onClick={e => {
						dispatch(viewProfile(currentUser));
						dispatch(toggleProfileModal());
					}}
				>
					<i className="fa fa-bars"></i>
				</span>
				<input type="text" placeholder="Search" className="chat__search" />
			</div>
			<div className="chat__recentchats">
				{chats.map((chat, i) => {
					return <SidebarItem key={chat.id} chat={chat} />;
				})}
			</div>
		</div>
	);
}

export default Sidebar;
