import { createSlice } from "@reduxjs/toolkit";

// Profile Slice

const profileSlice = createSlice({
	name: "profile",
	initialState: { profileBeingViewed: {} },
	reducers: {
		ProfileViewed: (state, action) => {
			state.profileBeingViewed = action.payload.user;
		},
	},
});

export default profileSlice.reducer;

const { ProfileViewed } = profileSlice.actions;

export const viewProfile = user => (dispatch, getState) => {
	dispatch({
		type: ProfileViewed.type,
		payload: {
			user,
		},
	});
};
