import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { produce } from "immer";
import { selectChat, addMessage } from "../../store/chat";
import {
	changeContactStatusToOffline,
	changeContactStatusToOnline,
	// setUserStatusToOffline,
	// setUserStatusToOnline,
} from "../../store/auth";
import moment from "moment";
import { changeSmallScreenLayout } from "../../store/layout";
import echo from "../../laravelEcho";
import { useEffect } from "react";
import CircularAvatar from "../layout/CircularAvatar";

function SidebarItem({ chat }) {
	const dispatch = useDispatch();
	const currentUserId = useSelector(state => state.auth.user.id);
	const selectedChatId = useSelector(state => state.chat.selectedChat.id);
	let { id, messages } = chat;
	let lastMessage = messages[0];
	console.log("Debug 1:", lastMessage);
	let lastMessageTime;
	if (messages.length) {
		lastMessage = produce(lastMessage, message => {
			if (message.body.length > 20) {
				message.body = message.body.substr(0, 20) + "....";
			}
		});
		console.log("Debug 2:", lastMessage);
		lastMessage = produce(lastMessage, message => {});
		console.log("Debug 3:", lastMessage);

		const lastMessageMoment = moment(lastMessage.created_at);
		if (moment().day() !== lastMessageMoment.day()) {
			lastMessageTime = `${
				lastMessageMoment.month() + 1
			}.${lastMessageMoment.date()}`;
		} else {
			lastMessageTime = `${
				lastMessageMoment.hour() > 12
					? lastMessageMoment.hour() - 12
					: lastMessageMoment.hour()
			}:${lastMessageMoment.minutes()}${
				lastMessageMoment.hour() >= 12 ? "pm" : "am"
			}`;
		}
	}

	let selecteduser = chat.users.filter(user => user.id !== currentUserId)[0];
	let name = selecteduser.name;
	let avatar = selecteduser.avatar;
	let selected = selectedChatId === id;
	const [isTyping, setIsTyping] = useState({});

	useEffect(() => {
		echo
			.join("chat." + chat.id)
			.here(contacts => {
				console.log("here.....");
				if (contacts.length > 1) {
					dispatch(changeContactStatusToOnline(selecteduser));
				} else {
					dispatch(changeContactStatusToOffline(selecteduser));
				}
			})
			.joining(contact => {
				dispatch(changeContactStatusToOnline(contact));
				console.log("Joinning");
			})
			.leaving(contact => {
				dispatch(changeContactStatusToOffline(contact));
				console.log("leaving");
			})
			.listen("NewMessage", res => {
				dispatch(addMessage(res.message, res.messageSender));
			});
		echo.private("chat." + chat.id).listenForWhisper("typing", e => {
			setIsTyping(e.user);
			// remove is typing indicator after 0.9s
			setTimeout(() => setIsTyping({}), 900);
		});
	}, [chat.id, dispatch, selecteduser]);

	return (
		<div
			className={`chat__sidebarItem ${
				selected ? "chat__sidebarItem-selected" : ""
			}`}
			onClick={async e => {
				if (selectedChatId !== chat.id) {
					await dispatch(selectChat(chat));
					dispatch(
						changeSmallScreenLayout({ showChatArea: true, showSidebar: false })
					);
				}
			}}
		>
			<CircularAvatar
				className="chat__sidebarItem_avatar"
				avatarImage={avatar}
			/>
			<div className="chat__sidebarItem_right">
				<div className="chat__sidebarItem_top">
					<h2 className="chat__sidebarItem_title">{name}</h2>
					<p className="chat__sidebarItem_date">
						{messages.length ? lastMessageTime : ""}
					</p>
				</div>
				<div className="chat__sidebarItem_bottom">
					<p className="chat__sidebarItem_message">
						{isTyping.id
							? isTyping.name + " is typing..."
							: messages.length
							? `${currentUserId === lastMessage.user.id ? "You: " : ""} ${
									lastMessage.body
							  }`
							: "No Messages"}
					</p>
					<span className="chat__sidebarItem_unread">12</span>
				</div>
			</div>
		</div>
	);
}

export default SidebarItem;
