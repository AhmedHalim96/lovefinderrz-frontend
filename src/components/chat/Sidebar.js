import React from "react";
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";

function Sidebar() {
	const chats = useSelector(state => state.chat.chats);
	// const currentUser = useSelector(state => state.auth.user)
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
				<span className="btn btn-outline chat__sidebar_toggler">&#9776;</span>
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
