import React, { Component } from "react";
import RecentChat from "./RecentChat";
import avatar from "../../assets/avatar.jpg";

class Chat extends Component {
	state = {
		recentChat: {
			avatar: avatar,
			name: "Ahmed Halim",
			message: "Hello, From The other side!",
			date: "11.04.3",
		},
	};
	render() {
		let { name, avatar, message, date } = this.state.recentChat;
		return (
			<div className="chat">
				<div className="chat__sidebar">
					<div className="chat__sidebar_top">
						<span className="btn btn-outline chat__sidebar_toggler">
							&#9776;
						</span>
						<input type="text" placeholder="Search" className="chat__search" />
					</div>
					<div className="chat__recentchats">
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
						<RecentChat
							name={name}
							date={date}
							avatar={avatar}
							message={message}
						/>
					</div>
				</div>
				<div className="chat__main">
					<div className="chat__title"></div>
					<div className="chat__messages"></div>
					<div className="chat__bar"></div>
				</div>
			</div>
		);
	}
}
export default Chat;
