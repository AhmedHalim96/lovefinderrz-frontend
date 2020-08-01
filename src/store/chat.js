import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import {
	getChatsConfig,
	sendMessageConfig,
	createChatConfig,
} from "./apiConfig";
import { contactAdded } from "./auth";

// chat Slice
const chatSlice = createSlice({
	name: "chat",
	initialState: {
		chats: [],
		loading: false,
		loaded: false,
		error: {},
		selectedChat: {},
	},
	reducers: {
		chatsRequested: (state, action) => {
			state.loading = true;
		},
		chatsRequestSuccess: (state, action) => {
			state.loading = false;
			state.loaded = true;
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
		sendingMessage: (state, action) => {
			// MessageLoading = true
		},
		messageSent: (state, action) => {
			// MessageLoading = false
			const message = action.payload;
			const chatIndex = state.chats.findIndex(
				chat => chat.id === message.chat_id
			);

			state.chats[chatIndex].messages = [
				message,
				...state.chats[chatIndex].messages,
			];

			if (message.chat_id === state.selectedChat.id) {
				state.selectedChat.messages = [message, ...state.selectedChat.messages];
			}
		},

		SendingMessageFailed: (state, action) => {
			// MessageLoading = false
		},
		messageAdded: (state, action) => {
			// MessageLoading = false
			const { chatId, message } = action.payload;

			const chatIndex = state.chats.findIndex(chat => chat.id === chatId);

			state.chats[chatIndex].messages = [
				message,
				...state.chats[chatIndex].messages,
			];

			if (chatId === state.selectedChat.id) {
				state.selectedChat.messages = [message, ...state.selectedChat.messages];
			}
		},
		creatingChatRequested: (state, action) => {
			state.loading = true;
		},

		chatCreated: (state, action) => {
			state.loading = false;
			state.chats = [...state.chats, action.payload];
			state.selectedChat = action.payload;
		},
		creatingChatFailed: (state, action) => {
			state.loading = false;
		},
		chatAdded: (state, action) => {
			state.chats = [action.payload.chat, ...state.chats];
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
	sendingMessage,
	messageSent,
	SendingMessageFailed,
	messageAdded,
	creatingChatRequested,
	chatCreated,
	creatingChatFailed,
	chatAdded,
} = chatSlice.actions;

// action Creator
export const getChats = () => async (dispatch, getState) => {
	await dispatch(
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

export const sendMessage = ({ body, chat_id }) => (dispatch, getState) => {
	dispatch(
		apiRequestStarted({
			url: sendMessageConfig.url,
			method: sendMessageConfig.method,
			data: { chat_id, body },
			onStart: sendingMessage.type,
			onSuccess: messageSent.type,
			onError: SendingMessageFailed.type,
			requireToken: true,
		})
	);
};

export const addMessage = (message, messageSender) => (dispatch, getState) => {
	const newMessage = { ...message, user: messageSender };
	dispatch({
		type: messageAdded.type,
		payload: {
			chatId: message.chat_id,
			message: newMessage,
		},
	});
};

export const startChat = (user_id, message) => async (dispatch, getState) => {
	await dispatch(
		apiRequestStarted({
			url: createChatConfig.url,
			method: createChatConfig.method,
			data: { user_id, message },
			onStart: creatingChatRequested.type,
			onSuccess: chatCreated.type,
			afterSuccess: contactAdded.type,
			onError: creatingChatFailed.type,
			requireToken: true,
		})
	);
};
export const addChat = chat => (dispatch, getState) => {
	dispatch({
		type: chatAdded.type,
		payload: {
			chat,
		},
	});
};
