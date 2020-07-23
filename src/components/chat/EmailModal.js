import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewProfileByEmail } from "../../store/profile";
import { togglEmailModal } from "../../store/layout";
import Backdrop from "../layout/Backdrop";
import emailValidator from "email-validator";

export default function EmailModal() {
	const dispatch = useDispatch();
	const apiError = useSelector(state => state.profile.error);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");

	const formSubmit = async e => {
		e.preventDefault();
		if (query) {
			if (emailValidator.validate(query)) {
				await dispatch(viewProfileByEmail(query));
				if (apiError) setError(apiError);
				else dispatch(togglEmailModal());
			} else setError("Please Enter a valid Email");
		}
	};
	return (
		<React.Fragment>
			<Backdrop close={() => dispatch(togglEmailModal())} />
			<div className="emailModal">
				<form className="form" onSubmit={formSubmit}>
					<div className="form__group form__group-inline">
						<input
							type="email"
							name="email"
							className="form__input"
							placeholder="Add with Email"
							onChange={e => setQuery(e.target.value)}
							onKeyUp={async e => {
								if (e.key === "Enter") {
									formSubmit(e);
								}
							}}
						/>
						<button type="submit" className="btn btn-outline u-ml-sm-1">
							<i className="fa fa-3x fa-plus-circle"></i>
						</button>
					</div>
					{error ? (
						<p className="paragraph paragraph-danger form__error">{error}</p>
					) : (
						<p className="u-mb-md-1"></p>
					)}
				</form>
			</div>
		</React.Fragment>
	);
}
