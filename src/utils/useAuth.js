import axios from 'axios';
import { config } from './constants';
export const API_URL = config.API_URL;

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

export async function refreshToken() {
	const user = JSON.parse(localStorage.getItem('authToken'));
	try {
		const response = await axios.post(`${API_URL}/token/refresh/`, {
			refresh: user.refresh,
		});
		if (response.status === 200) {
			user.access = response.data.access;
			localStorage.setItem('authToken', JSON.stringify(user));
			return response;
		}
	} catch (error) {
		return error.response;
	}
}
