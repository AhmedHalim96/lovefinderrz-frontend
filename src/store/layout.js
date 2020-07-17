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
			showProfileModal: false,
		},
		sideMenu: {
			isVisible: false,
			closing: false,
		},
		emailModal: {
			isVisible: false,
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
		profileModalOpened: (layout, action) => {
			layout.chat.showProfileModal = true;
		},
		profileModalClosed: (layout, action) => {
			layout.chat.showProfileModal = false;
		},
		sideMenuOpened: (layout, action) => {
			layout.sideMenu.isVisible = true;
		},
		sideMenuClosing: (layout, actions) => {
			layout.sideMenu.closing = true;
		},
		sideMenuClosed: (layout, action) => {
			layout.sideMenu.isVisible = false;
			layout.sideMenu.closing = false;
		},
		emailModalOpened: (layout, action) => {
			layout.emailModal.isVisible = true;
		},
		emailModalClosed: (layout, action) => {
			layout.emailModal.isVisible = false;
		},
	},
});

export default layoutSlice.reducer;

// Action Creators
const {
	animatedRedirectionStarted,
	animatedRedirectionDone,
	smallScreensLayoutChanged,
	profileModalClosed,
	sideMenuClosing,
	sideMenuClosed,
	sideMenuOpened,
	emailModalClosed,
	emailModalOpened,
} = layoutSlice.actions;

export const { profileModalOpened } = layoutSlice.actions;

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

export const toggleProfileModal = () => (dispatch, getState) => {
	getState().layout.chat.showProfileModal
		? dispatch({
				type: profileModalClosed.type,
		  })
		: dispatch({
				type: profileModalOpened.type,
		  });
};

export const toggleSideMenu = () => async (dispatch, getState) => {
	if (getState().layout.sideMenu.isVisible) {
		dispatch({
			type: sideMenuClosing.type,
		});

		await setTimeout(() => {
			dispatch({
				type: sideMenuClosed.type,
			});
		}, 500);
	} else
		dispatch({
			type: sideMenuOpened.type,
		});
};

export const togglEmailModal = () => (dispatch, getState) => {
	getState().layout.emailModal.isVisible
		? dispatch({
				type: emailModalClosed.type,
		  })
		: dispatch({
				type: emailModalOpened.type,
		  });
};
