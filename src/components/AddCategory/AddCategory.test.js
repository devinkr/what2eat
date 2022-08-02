import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import AddCategory from './AddCategory';

jest.mock('axios');

function fillFormAndSubmit(screen, title) {
	const addCategoryEl = screen.getByRole('button', {name :/add/i });
	const inputEl = screen.getByLabelText('add category');
	fireEvent.change(inputEl, { target: { value: title } });
	fireEvent.click(addCategoryEl);
}

test('should show add category form', () => {
	render(<AddCategory />);

	expect(screen.getByLabelText('add category')).toBeVisible();
	expect(screen.getByRole('button', { name: /add/i })).toBeVisible();
});

describe('If API error', () => {
	test('should show error message and add class is-invalid to input', async () => {
		render(<AddCategory />);
		const error = {
			response: {
				status: 0,
			},
		};

		axios.post.mockRejectedValueOnce(error);
		fillFormAndSubmit(screen, 'test');
		const errorMessage = await screen.findByText(/something went wrong/i);
		const inputEl = await screen.findByLabelText('add category');
		expect(errorMessage).toBeVisible();
		expect(inputEl.classList.contains('is-invalid')).toBe(true);
	});
});
