import React from "react";

export default function SidebarChat({ avatar, name, message, date, selected }) {
	return (
		<div
			className={`chat__sidebarchat ${
				selected ? "chat__sidebarchat-selected" : ""
			}`}
		>
			<img
				src={avatar}
				alt={name + "'s Avatar"}
				className="chat__sidebarchat_avatar"
			/>
			<div className="chat__sidebarchat_info">
				<div className="chat__sidebarchat_title">
					<h2 className="chat__sidebarchat_title_username">{name}</h2>
					<p className="chat__sidebarchat_title_date">{date}</p>
				</div>
				<p className="chat__sidebarchat_message">{message}</p>
			</div>
		</div>
	);
}
