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
		errors: {
			login: {},
			register: {},
		},
	},
	reducers: {
		userLogInRequested: (state, action) => {
			state.loading = true;
			state.errors.login = {};
		},
		userLoggedIn: (state, action) => {
			const { user, access_token } = action.payload;
			state.authenticated = true;
			state.token = access_token;
			state.user = user;
			state.loading = false;
			state.errors.login = {};
		},
		userLogInFailed: (state, action) => {
			state.loading = false;
			state.errors.login.errorOccurred = true;
			state.errors.login.errorMessage = action.payload.message;
		},
		userRegisterRequested: (state, action) => {
			state.loading = true;
			state.errors.register = {};
		},
		userRegistered: (state, action) => {
			state.loading = false;
			state.errors.register = {};
		},
		userRegisterFailed: (state, action) => {
			const { email, message, target } = action.payload;

			state.loading = false;
			state.errors.register.errorOccurred = false;

			if (email) {
				state.errors.register.errorTarget = "email";
				state.errors.register.errorMessage = email[0];
			}
			if (message) {
				state.errors.register.errorMessage = message;
			}
			if (target) {
				state.errors.register.errorTarget = target;
			}
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

export const registerUser = (
	name,
	email,
	password,
	confirmPassword,
	avatar
) => (dispatch, getState) => {
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
