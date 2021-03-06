import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useSelector, useDispatch } from "react-redux";
import { toggleSideMenu } from "../../store/layout";
// import { viewProfileByEmail } from "../../store/profile";

function Sidebar() {
	const dispatch = useDispatch();
	const chats = useSelector(state => state.chat.chats);
	const showSidebar = useSelector(
		state => state.layout.chat.smallScreensLayout.showSidebar
	);
	const [query, setQuery] = useState("");

	return (
		<div
			className={`chat__sidebar chat__sidebar_phone-port-${
				showSidebar ? "show" : "hide"
			}`}
		>
			<div className="chat__sidebar_top">
				<span
					className="btn btn-outline chat__sidebar_toggler"
					onClick={e => {
						dispatch(toggleSideMenu());
					}}
				>
					<i className="fa fa-bars"></i>
				</span>
				<input
					type="text"
					placeholder="Search"
					className="chat__search"
					onChange={e => {
						const val = e.target.value;
						setQuery(val);
					}}
					onKeyUp={e => {
						if (e.key === "Enter" && query) {
							// dispatch(viewProfileByEmail(query));
						}
					}}
				/>
			</div>
			<div className="chat__recentchats">
				{chats.map((chat, i) => {
					return <SidebarItem key={chat.id} chat={chat} />;
				})}
			</div>
		</div>
	);
}

export default Sidebar;
