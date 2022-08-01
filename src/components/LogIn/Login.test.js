import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import Login from './LogIn';

jest.mock('axios');

test('should show login form', () => {
	render(<Login />);

	expect(screen.getByText(/Please login/i)).toBeVisible();
	expect(screen.getByLabelText('Username')).toBeVisible();
	expect(screen.getByLabelText('password')).toBeVisible();
});

test('should show error on failed login', async () => {
	const error = {
		response: {
			status: 401,
			data: {
				detail: 'No active account found with the given credentials',
			},
		},
	};

	axios.post.mockRejectedValueOnce(error);

	render(<Login />);
	const logInEl = screen.getByRole('button', { name: /log in/i });
	fireEvent.click(logInEl);
	const alertEl = await screen.findByRole('alert');
	expect(alertEl).toBeVisible();
	expect(
		screen.getByLabelText('Username').classList.contains('is-invalid')
	).toBe(true);
	expect(
		screen.getByLabelText('password').classList.contains('is-invalid')
	).toBe(true);
});
