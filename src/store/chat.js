import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import { getChatsConfig } from "./apiConfig";

// chat Slice
const chatSlice = createSlice({
	name: "chat",
	initialState: { chats: [], loading: false, error: {}, selectedChat: {} },
	reducers: {
		chatsRequested: (state, action) => {
			state.loading = true;
		},
		chatsRequestSuccess: (state, action) => {
			state.loading = false;
			state.chats = action.payload;
		},
		chatsRequestFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload.error;
		},
		chatSelected: (state, action) => {
			state.selectedChat = action.payload.chat;
		},
		chatUnSelected: (state, action) => {
			state.selectedChat = {};
		},
	},
});

export default chatSlice.reducer;

const {
	chatsRequested,
	chatsRequestFailed,
	chatsRequestSuccess,
	chatSelected,
	chatUnSelected,
} = chatSlice.actions;

// action Creator

export const getChats = () => (dispatch, getState) => {
	dispatch(
		apiRequestStarted({
			url: getChatsConfig.url,
			method: getChatsConfig.method,
			onStart: chatsRequested.type,
			onSuccess: chatsRequestSuccess.type,
			onError: chatsRequestFailed.type,
			requireToken: true,
		})
	);
};

export const selectChat = chat => (dispatch, getState) => {
	dispatch({
		type: chatSelected.type,
		payload: { chat: chat },
	});
};
export const unSelectChat = () => (dispatch, getState) => {
	dispatch({
		type: chatUnSelected.type,
	});
};
