import { createSlice, createAction } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./api";
import { getChatsConfig, sendMessageConfig } from "./apiConfig";

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
		sendingMessage: (state, action) => {
			// MessageLoading = true
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
		SendingMessageFailed: (state, action) => {
			// MessageLoading = false
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
	SendingMessageFailed,
	messageAdded,
} = chatSlice.actions;

// action Creator
const messageSent = createAction("chat/messageSent");
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
