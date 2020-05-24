import React, { Component } from "react";

class Chat extends Component {
	render() {
		return (
			<div className="chat">
				<div className="chat__sidebar">
					<div className="chat__sidebar_top">
						<span className="btn btn-outline chat__sidebar_toggler">
							&#9776;
						</span>
						<input type="text" placeholder="Search" className="chat__search" />
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
