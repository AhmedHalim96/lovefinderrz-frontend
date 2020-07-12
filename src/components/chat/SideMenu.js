import React from "react";
import Backdrop from "../layout/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { avatarURL } from "../../store/apiConfig";
import { viewProfile } from "../../store/profile";
import { toggleProfileModal } from "../../store/layout";

export default function SideMenu() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.auth.user);
	const avatar = avatarURL + "/" + currentUser.avatar;

	return (
		<React.Fragment>
			<Backdrop />
			<div className="sideMenu">
				<div className="sideMenu__top">
					<div
						className="circularAvatar sideMenu__avatar"
						style={{ backgroundImage: `url(${avatar}` }}
					></div>
					<div className="sideMenu__currentUserInfo">
						<h3 className="sideMenu__currentUserName">{currentUser.name}</h3>
						<span className="sideMenu__currentUserEmail">
							{currentUser.email}
						</span>
					</div>
				</div>
				<div className="sideMenu__actions">
					<div
						className="sideMenu__action"
						onClick={e => {
							dispatch(viewProfile(currentUser));
							dispatch(toggleProfileModal());
						}}
					>
						<i className="fa fa-user-circle-o fa-2x"></i> View Profile
					</div>
					<div className="sideMenu__action">
						<i className="fa fa-envelope-o fa-2x"></i> Start New Chat
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
