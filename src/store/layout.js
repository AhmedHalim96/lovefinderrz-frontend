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
	},
});

export default layoutSlice.reducer;

// Action Creators
const {
	animatedRedirectionStarted,
	animatedRedirectionDone,
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
