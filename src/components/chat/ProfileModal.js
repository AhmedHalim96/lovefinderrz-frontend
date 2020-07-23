import React from "react";
import Backdrop from "../layout/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileModal } from "../../store/layout";
import Spinner from "../layout/Spinner";
import { avatarURL } from "../../store/apiConfig";
import { getContacts } from "../../store/profile";
import { startChat } from "../../store/chat";

export default function ProfileModal() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.profile.profileBeingViewed);
	const loading = useSelector(state => state.chat.loading);
	const currentUserId = useSelector(state => state.auth.user.id);
	const contactIds = useSelector(state => getContacts(state)).map(
		contact => contact.id
	);

	const chatExist = contactIds.includes(user.id);
	const avatar = avatarURL + "/" + user.avatar;
	if (loading) return <Spinner />;
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
							<span className="profile__email">Email:{user.email}</span>
						</div>
					</div>
				</div>
				<div className="profile__actions">
					{currentUserId !== user.id && !chatExist ? (
						<div
							className="profile__action"
							onClick={async e => {
								await dispatch(startChat(user.id));
								dispatch(toggleProfileModal());
							}}
						>
							<i className="fa fa-send"></i> Send Message
						</div>
					) : null}
				</div>
			</div>
		</React.Fragment>
	);
}
