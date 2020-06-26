import { createSlice } from "@reduxjs/toolkit";

// Layout Slice

const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		login: {
			exiting: false,
			initialAnimation: "u-move-in-left",
			exitAnimation: "u-move-out-left",
			redirectWithEmailAddress: false,
		},
		register: {
			exiting: false,
			initialAnimation: "u-move-in-right",
			exitAnimation: "u-move-out-right",
			redirectWithEmailAddress: false,
		},
		chat: {
			smallScreensLayout: {
				showSidebar: true,
				showChatArea: false,
			},
		},
	},
	reducers: {
		animatedRedirectionStarted: (layout, action) => {
			const target = action.payload.currentPage;
			layout[target].exiting = true;
		},

		animatedRedirectionDone: (layout, action) => {
			const target = action.payload.currentPage;
			layout[target].exiting = false;
		},

		smallScreensLayoutChanged: (layout, action) => {
			const { showSidebar, showChatArea } = action.payload;
			layout.chat.smallScreensLayout.showChatArea = showChatArea;
			layout.chat.smallScreensLayout.showSidebar = showSidebar;
		},
	},
});

export default layoutSlice.reducer;

// Action Creators
const {
	animatedRedirectionStarted,
	animatedRedirectionDone,
	smallScreensLayoutChanged,
} = layoutSlice.actions;

export const startAnimatedRedirection = (
	currentPage,
	redirectTo,
	history
) => async (dispatch, state) => {
	// TODo: Improve this method
	dispatch({
		type: animatedRedirectionStarted.type,
		payload: { currentPage },
	});
	await setTimeout(() => {
		history.push(redirectTo);
		dispatch({
			type: animatedRedirectionDone.type,
			payload: { currentPage },
		});
	}, 750);
};

export const changeSmallScreenLayout = ({ showChatArea, showSidebar }) => (
	dispatch,
	getState
) => {
	dispatch({
		type: smallScreensLayoutChanged.type,
		payload: { showChatArea, showSidebar },
	});
};
