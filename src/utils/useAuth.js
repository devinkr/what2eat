import axios from 'axios';
import { config } from './constants';
export const API_URL = config.API_URL;

// Get JWT Token from API 
export async function getToken(username, password) {
	const url = `${API_URL}/token/`;
	try {
		const response = await axios.post(url, { username, password });
		if (response.status === 200) return response;
	} catch (error) {
		return error.response;
	}
}

// Create a new user account
export async function createAccount(username, password, password2) {
	const url = `${config.API_URL}/register/`;
	try {
		const response = await axios.post(url, { username, password, password2 });
		if (response.status === 201) return response;
	} catch (error) {
		return error.response;
	}
}

// Save token to local storage
export function saveToken(token) {
	localStorage.setItem('authToken', JSON.stringify(token));
}

// Clear token from local storage
export function signOut() {
	localStorage.removeItem('authToken');
}

// Get token from local storage and return authorization header for API calls. 
export function getAuthHeader() {
	const user = JSON.parse(localStorage.getItem('authToken'));
	if (user && user.access) {
		return { Authorization: `Bearer ${user.access}` };
	} else {
		return {};
	}
}

// Use refresh token to get new access token
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
