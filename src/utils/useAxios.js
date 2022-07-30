import axios from 'axios';
import { config } from './constants';
import { getAuthHeader } from './useAuth';
import { refreshToken } from './useAuth';
const API_URL = config.API_URL;

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
		}
	}
}
