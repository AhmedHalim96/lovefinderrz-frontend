import React from "react";
import Backdrop from "../layout/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { avatarURL } from "../../store/apiConfig";
import { viewProfile } from "../../store/profile";
import {
	toggleProfileModal,
	toggleSideMenu,
	togglEmailModal,
} from "../../store/layout";

export default function SideMenu() {
	const dispatch = useDispatch();
	const closing = useSelector(state => state.layout.sideMenu.closing);
	const currentUser = useSelector(state => state.auth.user);
	const avatar = avatarURL + "/" + currentUser.avatar;

	return (
		<React.Fragment>
			{!closing ? <Backdrop close={e => dispatch(toggleSideMenu())} /> : null}
			<div className={`sideMenu ${closing ? "u-slide-left" : "u-slide-right"}`}>
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
							dispatch(toggleSideMenu());
							dispatch(viewProfile(currentUser));
							dispatch(toggleProfileModal());
						}}
					>
						<i className="fa fa-user-circle-o fa-2x"></i> View Profile
					</div>
					<div
						className="sideMenu__action"
						onClick={e => {
							dispatch(toggleSideMenu());
							dispatch(togglEmailModal());
						}}
					>
						<i className="fa fa-envelope-o fa-2x"></i> Start New Chat with Email
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
