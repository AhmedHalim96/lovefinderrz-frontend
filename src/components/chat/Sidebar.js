import React from "react";
import SidebarChat from "./SidebarChat";

export default function Sidebar({ name, date, avatar, message }) {
	let chats = [];

	for (let i = 0; i < 20; i++) {
		chats.push(
			<SidebarChat
				key={i}
				name={name}
				date={date}
				avatar={avatar}
				message={message}
				selected={i === 0}
			/>
		);
	}
	return (
		<div className="chat__sidebar">
			<div className="chat__sidebar_top">
				<span className="btn btn-outline chat__sidebar_toggler">&#9776;</span>
				<input type="text" placeholder="Search" className="chat__search" />
			</div>
			<div className="chat__recentchats">{chats}</div>
		</div>
	);
}
