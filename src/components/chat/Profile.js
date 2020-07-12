import React from "react";
import Backdrop from "../layout/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileModal } from "../../store/layout";
import { avatarURL } from "../../store/apiConfig";

export default function Profile() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.profile.profileBeingViewed);
	const avatar = avatarURL + "/" + user.avatar;
	return (
		<React.Fragment>
			<Backdrop close={e => dispatch(toggleProfileModal())} />
			<div className="profile">
				<div className="profile__info">
					<div className="profile__info_top">
						<h3>User Info</h3>
						<span
							className="btn btn-outline profile__close"
							onClick={e => dispatch(toggleProfileModal())}
						>
							<i className="fa fa-close"></i>
						</span>
					</div>
					<div className="profile__info_bottom">
						<div
							className="circularAvatar profile__avatar"
							style={{ backgroundImage: `url(${avatar}` }}
						></div>
						<div className="profile__info_bottom_right">
							<h2 className="profile__username">{user.name}</h2>
							<span className="profile__email">
								Email:
								{user.email}
							</span>
						</div>
					</div>
				</div>
				<div className="profile__actions">
					<div className="profile__action">
						<i className="fa fa-send"></i> Send Message
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
