import React from "react";

export default function SidebarItem({
	avatar,
	name,
	message,
	date,
	selected,
	selectChat,
}) {
	return (
		<div
			className={`chat__sidebarItem ${
				selected ? "chat__sidebarItem-selected" : ""
			}`}
			onClick={selectChat}
		>
			<img
				src={avatar}
				alt={name + "'s Avatar"}
				className="chat__sidebarItem_avatar"
			/>
			<div className="chat__sidebarItem_info">
				<div className="chat__sidebarItem_title">
					<h2 className="chat__sidebarItem_title_username">{name}</h2>
					<p className="chat__sidebarItem_title_date">{date}</p>
				</div>
				<p className="chat__sidebarItem_message">{message}</p>
			</div>
		</div>
	);
}
