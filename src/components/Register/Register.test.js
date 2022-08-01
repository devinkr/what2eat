import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Register from './Register';

jest.mock('axios');

function fillForm(screen, username, password, password2) {
	const usernameEl = screen.getByLabelText('Username');
	const passwordEl = screen.getByLabelText('password');
	const password2El = screen.getByLabelText('confirm password');
	fireEvent.change(usernameEl, { target: { value: 'username' } });
	fireEvent.change(passwordEl, { target: { value: 'password' } });
	fireEvent.change(password2El, { target: { value: 'password2' } });
}

test('should render create account form', () => {
	render(<Register />);

	expect(screen.getByText(/Please register/i)).toBeVisible();
	expect(screen.getByLabelText('Username')).toBeVisible();
	expect(screen.getByLabelText('password')).toBeVisible();
	expect(screen.getByLabelText('confirm password')).toBeVisible();
});

describe("If passwords don't match", () => {
	test('should show error', () => {
		render(<Register />);

		fillForm(screen, 'username', 'password', 'password2');
		expect(screen.getByText(/passwords must match/i)).toBeVisible();
		expect(
			screen.getByLabelText('confirm password').classList.contains('is-invalid')
		).toBe(true);
	});

	test('should disable Register button', () => {
		render(<Register />);

		fillForm(screen, 'username', 'password', 'password2');
		expect(screen.getByRole('button', { name: /register/i })).toBeDisabled();
	});
});

describe('Create account validation error', () => {
	const error = {
		response: {
			status: 400,
			data: {
				username: ['This field must be unique.'],
				password: [
					'This password is too short. It must contain at least 8 characters.',
					'This password is too common.',
				],
			},
		},
	};

	describe('If username is not unique', () => {
		test('should show error and add class is-invalid', async () => {
		
			axios.post.mockRejectedValueOnce(error);

			render(<Register />);
			const registerEl = screen.getByRole('button', { name: /register/i });
			fireEvent.click(registerEl);
			const errorEl = await screen.findByText(/must be unique/i);
			expect(errorEl).toBeVisible();
			expect(
				screen.getByLabelText('Username').classList.contains('is-invalid')
			).toBe(true);
		});
	});
	
	describe('If password is too common', () => {
		test('should show error and add class is-invalid', async () => {
			axios.post.mockRejectedValueOnce(error);

			render(<Register />);
			const registerEl = screen.getByRole('button', { name: /register/i });
			fireEvent.click(registerEl);
			const errorEl = await screen.findByText(/password is too common/i);
			expect(errorEl).toBeVisible();
			expect(
				screen.getByLabelText('password').classList.contains('is-invalid')
			).toBe(true);
		});
	});

		describe('If password is too short', () => {
			test('should show error and add class is-invalid', async () => {
				axios.post.mockRejectedValueOnce(error);

				render(<Register />);
				const registerEl = screen.getByRole('button', { name: /register/i });
				fireEvent.click(registerEl);
				const errorEl = await screen.findByText(/password is too short/i);
				expect(errorEl).toBeVisible();
				expect(
					screen.getByLabelText('password').classList.contains('is-invalid')
				).toBe(true);
			});
		});
	
});
