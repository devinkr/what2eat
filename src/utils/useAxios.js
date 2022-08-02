import axios from 'axios';
import { config } from './constants';
import { getAuthHeader } from './useAuth';
import { refreshToken } from './useAuth';
export const API_URL = config.API_URL;

// GET request to specified endpoint
// If access token is not valid will try to refresh token and then repeat request
export async function getAPIData(endpoint) {
	try {
		const response = await axios.get(`${API_URL}/${endpoint}/`, {
			headers: getAuthHeader(),
		});
		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		if (
			error.response.status === 401 &&
			error.response.data.code === 'token_not_valid'
		) {
			const refresh = await refreshToken();
			if (refresh.status === 200) {
				return getAPIData(endpoint);
			} else {
				return refresh;
			}
		} else {
			return error.response;
		}
	}
}

// POST request to specified endpoint with specified data
// If access token is not valid will try to refresh token and then repeat request
export async function postAPIData(endpoint, data) {
	try {
		const response = await axios.post(`${API_URL}/${endpoint}/`, data, {
			headers: getAuthHeader(),
		});
		if (response.status === 201) {
			return response;
		}
	} catch (error) {
		if (
			error.response.status === 401 &&
			error.response.data.code === 'token_not_valid'
		) {
			const refresh = await refreshToken();
			if (refresh.status === 200) {
				return postAPIData(endpoint, data);
			} else {
				return refresh;
			}
		} else {
			return error.response;
		}
	}
}

// DELETE request to specified endpoint
// If access token is not valid will try to refresh token and then repeat request
export async function deleteAPIData(endpoint) {
	try {
		const response = await axios.delete(`${API_URL}/${endpoint}/`, {
			headers: getAuthHeader(),
		});
		if (response.status === 204) {
			return response;
		}
	} catch (error) {
		if (
			error.response.status === 401 &&
			error.response.data.code === 'token_not_valid'
		) {
			const refresh = await refreshToken();
			if (refresh.status === 200) {
				return deleteAPIData(endpoint);
			} else {
				return refresh;
			}
		} else {
			return error.response;
		}
	}
}
