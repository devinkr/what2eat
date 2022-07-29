import axios from 'axios';
import { config } from './constants';

export async function getToken(username, password) {
	const url = `${config.API_URL}/token/`;
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
