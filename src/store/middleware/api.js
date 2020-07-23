import axios from "axios";
import { apiRequestStarted, apiRequestSuccess, apiRequestFailed } from "../api";
import { baseURL } from "../apiConfig";

const api = ({ dispatch, getState }) => next => async action => {
	if (action.type !== apiRequestStarted.type) return next(action);

	const {
		url,
		method,
		data,
		onStart,
		onSuccess,
		afterSuccess,
		onError,
		requireToken,
	} = action.payload;

	let headers = { Accept: "application/json" };
	if (requireToken) {
		const token = getState().auth.token;
		headers = { ...headers, Authorization: "Bearer " + token };
	}

	if (onStart) dispatch({ type: onStart });
	next(action);

	await axios
		.request({
			baseURL,
			url,
			method,
			data,
			headers,
		})
		.then(res => {
			dispatch(apiRequestSuccess(res.data));
			if (onSuccess) dispatch({ type: onSuccess, payload: res.data });
			if (afterSuccess) dispatch({ type: afterSuccess, payload: res.data });
		})
		.catch(err => {
			console.log(err.message);
			dispatch(apiRequestFailed(err.message));
			if (onError)
				dispatch({
					type: onError,
					payload: err.response ? err.response.data : err.message,
				});
		});
};

export default api;
