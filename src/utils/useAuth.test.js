import { API_URL, getToken } from './useAuth';
import axios from 'axios';

jest.mock('axios');

describe('getToken', () => {
	describe('when Login is successful', () => {
		it('should return refresh token', async () => {
			const response = {
				status: 200,
				data: {
					access: 'access token',
					refresh: 'refresh token',
				},
			};

			axios.post.mockResolvedValueOnce(response);

			const result = await getToken('username', 'password');

			expect(axios.post).toHaveBeenCalledWith(`${API_URL}/token/`, {
				password: 'password',
				username: 'username',
			});
			expect(result).toEqual(response);
		});
	});

	describe('when Login is unsuccessful', () => {
		it('should return error', async () => {
			const error = {
				response: {
					status: 401,
					data: {
						detail: 'No active account found with the given credentials',
					},
				},
			};

			axios.post.mockRejectedValueOnce(error);
			const result = await getToken('username', 'password');
			expect(axios.post).toHaveBeenCalledWith(`${API_URL}/token/`, {
				password: 'password',
				username: 'username',
			});
			expect(result).toEqual(error.response);
		});
	});
});
