/* eslint-disable no-unused-vars */
import { createSlice, createAction } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import { loginConfig, registerConfig, userStatusConfig } from "./apiConfig";

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
		fetchingStoredUser: (state, action) => {
			state.loading = true;
		},
		fetchingStoredUserSuccess: (state, action) => {
			const { user, token } = action.payload;
			state.user = user;
			state.token = token;
			state.authenticated = true;
			state.loading = false;
		},
		fetchingStoredUserFailed: (state, action) => {
			state.loading = false;
		},
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
		userLoggedOut: (state, action) => {
			state.user = {};
			state.authenticated = false;
			state.token = null;
		},
		userOnline: (state, action) => {
			state.user.status = "online";
		},
		userOffline: (state, action) => {
			state.user.status = "offline";
		},
		contactIsOnline: (state, action) => {
			const contactIndex = state.user.contacts.findIndex(
				contact => contact.id === action.payload.contact.id
			);
			state.user.contacts[contactIndex].status = "online";
		},
		contactIsOffline: (state, action) => {
			const contactIndex = state.user.contacts.findIndex(
				contact => contact.id === action.payload.contact.id
			);
			state.user.contacts[contactIndex].status = "offline";
		},
		contactAdded: (state, action) => {
			let contact;
			if (action.payload.contact) contact = action.payload.contact;
			else {
				contact = action.payload.users.filter(
					user => user.id !== state.user.id
				)[0];
			}
			state.user.contacts.push(contact);

			// Store in localStorage
			localStorage.setItem("user", JSON.stringify(state.user));
		},
	},
});

export default authSlice.reducer;

const {
	userLogInRequested,
	userRegistered,
	userRegisterFailed,
	userLoggedIn,
	userLogInFailed,
	userRegisterRequested,
	fetchingStoredUser,
	fetchingStoredUserSuccess,
	fetchingStoredUserFailed,
	userLoggedOut,
	userOffline,
	userOnline,
	contactIsOnline,
	contactIsOffline,
} = authSlice.actions;

export const { contactAdded } = authSlice.actions;

// Action Creators

const storingUserInlocalStorage = createAction(
	"auth/storingUserInlocalStorage"
);

export const fetchUserFromLocal = () => (dispatch, getState) => {
	dispatch({ type: fetchingStoredUser.type });
	const token = localStorage.getItem("token");
	const user = JSON.parse(localStorage.getItem("user"));
	if (user && token) {
		dispatch({
			type: fetchingStoredUserSuccess.type,
			payload: { user, token },
		});
	} else {
		dispatch({ type: fetchingStoredUserFailed.type });
	}
};

export const loginInUser = (email, password, remeberMe) => async (
	dispatch,
	getState
) => {
	await dispatch(
		apiRequestStarted({
			url: loginConfig.url,
			method: loginConfig.method,
			data: { email, password },
			onStart: userLogInRequested.type,
			onSuccess: userLoggedIn.type,
			onError: userLogInFailed.type,
		})
	);

	if (remeberMe) {
		const { user, token } = getState().auth;
		if (user && token) {
			dispatch({ type: storingUserInlocalStorage.type });
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", token);
		}
	}
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

export const logOutUser = () => (dispatch, getState) => {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
	dispatch({
		type: userLoggedOut.type,
	});
};

export const setUserStatusToOnline = () => (dispatch, getState) => {
	console.log("TEST");
	dispatch(
		apiRequestStarted({
			url: userStatusConfig.url + "/online",
			method: userStatusConfig.method,
			onSuccess: userOnline.type,
			requireToken: true,
		})
	);
};

export const setUserStatusToOffline = () => (dispatch, getState) => {
	dispatch(
		apiRequestStarted({
			url: userStatusConfig.url + "/offline",
			method: userStatusConfig.method,
			onSuccess: userOnline.type,
			requireToken: true,
		})
	);
};

export const changeContactStatusToOnline = contact => (dispatch, getState) => {
	dispatch({
		type: contactIsOnline.type,
		payload: {
			contact,
		},
	});
};

export const changeContactStatusToOffline = contact => (dispatch, getState) => {
	dispatch({
		type: contactIsOffline.type,
		payload: {
			contact,
		},
	});
};

export const addToContacts = contact => async (dispatch, getState) => {
	await dispatch({
		type: contactAdded.type,
		payload: {
			contact,
		},
	});
};
