import { API_URL, getAPIData } from './useAxios';
import axios from 'axios';

jest.mock('axios');

describe('getAPIData', () => {
	describe('when get is successful', () => {
		it('should call correct endpoint and return response', async () => {
			const response = {
				status: 200,
				data: [],
			};

			axios.get.mockResolvedValueOnce(response);

			const result = await getAPIData('categories');
			expect(axios.get).toHaveBeenCalledWith(`${API_URL}/categories/`, {
				headers: {},
			});
			expect(result).toEqual(response);
		});
	});
});
