import axios from 'axios';
import { config } from './constants';
const API_URL = config.API_URL;

export async function getToken(username, password) {
	const url = `${API_URL}/token/`;
	try {
		const response = await axios.post(url, { username, password });
		if (response.status === 200) return response;
	} catch (error) {
		return error.response;
	}
}

export async function createAccount(username, password, password2) {
	const url = `${config.API_URL}/register/`;
	try {
		const response = await axios.post(url, { username, password, password2 });
		if (response.status === 201) return response;
	} catch (error) {
		return error.response;
	}
}

export function saveToken(token) {
	localStorage.setItem('authToken', JSON.stringify(token));
}

export function signOut() {
	localStorage.removeItem('authToken');
}

export function getAuthHeader() {
	const user = JSON.parse(localStorage.getItem('authToken'));
	if (user && user.access) {
		return { Authorization: `Bearer ${user.access}` };
	} else {
		return {};
	}
}

export async function getAPIData(endpoint) {
	try {
		console.log('Trying API call');
		const response = await axios.get(`${API_URL}/${endpoint}/`, {
			headers: getAuthHeader(),
		});
		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		console.log('There was an error now in Catch Block');
		// If Error is expired Token then try to refresh access token
		if (
			error.response.status === 401 &&
			error.response.data.code === 'token_not_valid'
		) {
			try {
				console.log('Error was token_not_valid');
				const user = JSON.parse(localStorage.getItem('authToken'));
				console.log('Trying to get Refresh Token');
				const refreshResponse = await axios.post(`${API_URL}/token/refresh/`, {
					refresh: user.refresh,
				});
				// If refresh token is valid then save new access and try category INDEX API call again
				if (refreshResponse.status === 200) {
					console.log('success refresh', refreshResponse.data.access);
					user.access = refreshResponse.data.access;
					localStorage.setItem('authToken', JSON.stringify(user));
					getAPIData();
				}
			} catch (error) {
				console.log('Refresh failed', error);
				return error.response;
			}
		}
	}
}
