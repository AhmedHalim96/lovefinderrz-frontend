/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import { loginConfig, registerConfig } from "./apiConfig";

// Auth Slice
const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: {},
		authenticated: false,
		token: null,
		loading: false,
		authLayout: {
			loginLayout: [],
			registerLayout: [],
		},
	},
	reducers: {
		userLogInRequested: (state, action) => {
			state.loading = true;
		},
		userLoggedIn: (state, action) => {
			const { user, access_token } = action.payload;
			state.authenticated = true;
			state.token = access_token;
			state.user = user;
			state.loading = false;
		},
		userLogInFailed: (state, action) => {
			state.loading = false;
		},
		userRegisterRequested: (state, action) => {
			state.loading = true;
		},
		userRegistered: (state, action) => {
			state.loading = false;
		},
		userRegisterFailed: (state, action) => {
			state.loading = false;
		},
	},
});

export default authSlice.reducer;

// Action Creators
const {
	userLogInRequested,
	userRegistered,
	userRegisterFailed,
	userLoggedIn,
	userLogInFailed,
	userRegisterRequested,
} = authSlice.actions;

export const loginInUser = (email, password) => (dispatch, getState) => {
	dispatch(
		apiRequestStarted({
			url: loginConfig.url,
			method: loginConfig.method,
			data: { email, password },
			onStart: userLogInRequested.type,
			onSuccess: userLoggedIn.type,
			onError: userLogInFailed.type,
		})
	);
};

export const registerUser = (name, email, password, avatar) => (
	dispatch,
	getState
) => {
	const formData = new FormData();
	formData.append("name", name);
	formData.append("email", email);
	formData.append("password", password);
	formData.append("avatar", avatar);

	dispatch(
		apiRequestStarted({
			url: registerConfig.url,
			method: registerConfig.method,
			data: formData,
			onStart: userRegisterRequested.type,
			onSuccess: userRegistered.type,
			onError: userRegisterFailed.type,
		})
	);
};
