import React from "react";

export default function RecentChat({ avatar, name, message, date }) {
	return (
		<div className="chat__recentchat">
			<img
				src={avatar}
				alt={name + "'s Avatar"}
				className="chat__recentchat_avatar"
			/>
			<div className="chat__recentchat_info">
				<div className="chat__recentchat_title">
					<h2 className="chat__recentchat_title_username">{name}</h2>
					<p className="chat__recentchat_title_date">{date}</p>
				</div>
				<p className="chat__recentchat_message">{message}</p>
			</div>
		</div>
	);
}
