import React from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar({
	name,
	date,
	avatar,
	message,
	phoneLayoutStatus,
	selectChat,
}) {
	let chats = [];

	for (let i = 0; i < 20; i++) {
		chats.push(
			<SidebarItem
				key={i}
				name={name}
				date={date}
				avatar={avatar}
				message={message}
				selected={i === 0}
				selectChat={selectChat}
			/>
		);
	}
	return (
		<div
			className={`chat__sidebar chat__sidebar_phone-port-${
				phoneLayoutStatus ? "show" : "hide"
			}`}
		>
			<div className="chat__sidebar_top">
				<span className="btn btn-outline chat__sidebar_toggler">&#9776;</span>
				<input type="text" placeholder="Search" className="chat__search" />
			</div>
			<div className="chat__recentchats">{chats}</div>
		</div>
	);
}
