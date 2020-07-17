import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import { profileSearchConfig } from "../store/apiConfig";
import { profileModalOpened } from "./layout";

// Profile Slice

const profileSlice = createSlice({
	name: "profile",
	initialState: { profileBeingViewed: {}, loading: false, error: "" },
	reducers: {
		profileViewed: (state, action) => {
			state.profileBeingViewed = action.payload.user;
		},
		profileSearchRequested: (state, action) => {
			state.loading = true;
			state.error = "";
		},
		profileSearchSuccess: (state, action) => {
			state.profileBeingViewed = action.payload;
			state.loading = false;
		},
		profileSearchError: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
	},
});

export default profileSlice.reducer;

const {
	profileViewed,
	profileSearchError,
	profileSearchRequested,
	profileSearchSuccess,
} = profileSlice.actions;

export const viewProfile = user => (dispatch, getState) => {
	dispatch({
		type: profileViewed.type,
		payload: {
			user,
		},
	});
};

export const viewProfileByEmail = email => async (dispatch, getState) => {
	await dispatch(
		apiRequestStarted({
			url: profileSearchConfig.url + email,
			method: profileSearchConfig.method,
			onStart: profileSearchRequested.type,
			onSuccess: profileSearchSuccess.type,
			afterSuccess: profileModalOpened.type,
			onError: profileSearchError.type,
			requireToken: true,
		})
	);
};
