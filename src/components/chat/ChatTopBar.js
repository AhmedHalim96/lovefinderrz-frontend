import React from "react";
import { changeSmallScreenLayout } from "../../store/layout";
import { unSelectChat } from "../../store/chat";
import { connect } from "react-redux";

function ChatTopBar({
	chatTitle,
	subTitle,
	changeSmallScreenLayout,
	unSelectChat,
}) {
	return (
		<div className="chat__topbar">
			<div className="chat__topbar_left">
				<button
					className="btn btn-outline chat__topbar_back"
					onClick={e => {
						changeSmallScreenLayout({ showChatArea: false, showSidebar: true });
						unSelectChat();
					}}
				>
					<i className="fa fa-arrow-left"></i>
				</button>
				<div className="chat__topbar_title">
					<h2 className="chat__topbar_title-main">{chatTitle}</h2>
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

export default connect(null, { changeSmallScreenLayout, unSelectChat })(
	ChatTopBar
);
