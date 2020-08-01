import React, { useState } from "react";
import Backdrop from "../layout/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileModal } from "../../store/layout";
import Spinner from "../layout/Spinner";
import { startChat } from "../../store/chat";
import CircularAvatar from "../layout/CircularAvatar";

export default function ProfileModal() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.profile.profileBeingViewed);
	const loading = useSelector(state => state.chat.loading);
	const currentUserId = useSelector(state => state.auth.user.id);
	const contactIds = useSelector(state => state.auth.user.contacts).map(
		contact => contact.id
	);
	const chatExist = contactIds.includes(user.id);
	const [msg, setMsg] = useState("");

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
						<CircularAvatar
							avatarImage={user.avatar}
							className="profile__avatar"
						/>
						<div className="profile__info_bottom_right">
							<h2 className="profile__username">{user.name}</h2>
							<span className="profile__email">Email:{user.email}</span>
						</div>
					</div>
				</div>
				<div className="profile__actions">
					{currentUserId !== user.id && !chatExist ? (
						<React.Fragment>
							<div className="profile__action">
								<input
									type="text"
									className="form__input profile__action_input"
									placeholder="Send Your First Message....."
									value={msg}
									onChange={e => setMsg(e.target.value)}
								/>
								<button
									className="btn btn-outline profile__action_btn"
									onClick={async e => {
										await dispatch(startChat(user.id, msg));
										dispatch(toggleProfileModal());
									}}
								>
									<i className="fa fa-send"></i>
								</button>
							</div>
						</React.Fragment>
					) : null}
				</div>
			</div>
		</React.Fragment>
	);
}
