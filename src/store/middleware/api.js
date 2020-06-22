import axios from "axios";
import { apiRequestStarted, apiRequestSuccess, apiRequestFailed } from "../api";
import { baseURL } from "../apiConfig";

const api = ({ dispatch, getState }) => next => action => {
	if (action.type !== apiRequestStarted.type) return next(action);

	const { url, method, data, onStart, onSuccess, onError } = action.payload;

	if (onStart) dispatch({ type: onStart });
	next(action);

	axios
		.request({
			baseURL,
			url,
			method,
			data,
		})
		.then(res => {
			dispatch(apiRequestSuccess(res.data));
			if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
		})
		.catch(err => {
			dispatch(apiRequestFailed(err.message));
			if (onError) dispatch({ type: onError, payload: err.message });
		});
};

export default api;
