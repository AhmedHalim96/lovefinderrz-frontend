import { combineReducers } from "redux";
import authReducer from "./auth";
import layoutReducer from "./layout";
import chatReducer from "./chat";
import profileReducer from "./profile";

export default combineReducers({
	auth: authReducer,
	layout: layoutReducer,
	chat: chatReducer,
	profile: profileReducer,
});
