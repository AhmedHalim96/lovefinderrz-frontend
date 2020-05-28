import React from "react";

export default function ChatTopBar({ username, subTitle, backToSideBar }) {
	return (
		<div className="chat__topbar">
			<div className="chat__topbar_left">
				<button
					className="btn btn-outline chat__topbar_back"
					onClick={backToSideBar}
				>
					<i className="fa fa-arrow-left"></i>
				</button>
				<div className="chat__topbar_title">
					<h2 className="chat__topbar_title-main">{username}</h2>
					<span className="chat__topbar_title-sub">{subTitle}</span>
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
