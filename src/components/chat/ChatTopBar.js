import React from "react";

export default function ChatTopBar({ username, subTitle }) {
	return (
		<div className="chat__topbar">
			<div className="chat__topbar_left">
				<h2 className="chat__topbar_title">{username}</h2>
				<span className="chat__topbar_subtitle">{subTitle}</span>
			</div>
			<div className="chat__topbar_right">
				<span className="btn btn-outline">
					<i className="fa fa-search"></i>
				</span>
			</div>
		</div>
	);
}
