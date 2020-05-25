import React, { Component } from "react";
import SidebarChat from "./SidebarChat";
import avatar from "../../assets/avatar.jpg";

class Chat extends Component {
	state = {
		recentChat: {
			avatar: avatar,
			name: "Ahmed Halim",
			message: "Hello, From The other side!",
			date: "11.04.3",
		},
		selectedChat: {
			username: "Ahmed Halim",
			subTitle: "Yesterday",
			messages: [
				{
					sentby: "Ahmed Halim",
					text:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sint saepe quae quo?",
				},
				{
					sentby: "me",
					text:
						"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam sint saepe quae quo?",
				},
			],
		},
	};
	render() {
		let { name, avatar, message, date } = this.state.recentChat;
		let { username, subTitle, messages } = this.state.selectedChat;
		let chats = [];
		let chatMessages = [];

		for (let i = 0; i < 20; i++) {
			chats.push(
				<SidebarChat
					name={name}
					date={date}
					avatar={avatar}
					message={message}
					selected={i === 0}
				/>
			);
		}
		return (
			<div className="chat">
				<div className="chat__sidebar">
					<div className="chat__sidebar_top">
						<span className="btn btn-outline chat__sidebar_toggler">
							&#9776;
						</span>
						<input type="text" placeholder="Search" className="chat__search" />
					</div>
					<div className="chat__recentchats u-scroller">{chats}</div>
				</div>
				<div className="chat__main">
					<div className="chat__title">
						<div className="chat__title_left">
							<h2 className="chat__title_main">{username}</h2>
							<span className="chat__title_subtitle">{subTitle}</span>
						</div>
						<div className="chat__title_right">
							<span className="btn btn-outline">
								<i className="fa fa-search"></i>
							</span>
						</div>
					</div>
					<div className="chat__messages">
						{/* @TODO:create message component */}
					</div>
					<div className="chat__bar">
						<span className="btn btn-outline chat__bar_attachment">
							<i className="fa fa-paperclip"></i>
						</span>
						<input
							type="text"
							className="chat__bar_input"
							placeholder="write a message......"
						/>
						<span className=" btn btn-outline chat__bar_emoji">
							<i className="fa fa-reddit-alien"></i>
						</span>
					</div>
				</div>
			</div>
		);
	}
}
export default Chat;
