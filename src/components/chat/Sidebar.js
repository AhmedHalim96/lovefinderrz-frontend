import React from "react";
import SidebarItem from "./SidebarItem";
import { connect } from "react-redux";

function Sidebar({ chats, showSidebar }) {
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

const mapStateToProps = state => ({
	currentUser: state.auth.user,
	showSidebar: state.layout.chat.smallScreensLayout.showSidebar,
});

export default connect(mapStateToProps, {})(Sidebar);
