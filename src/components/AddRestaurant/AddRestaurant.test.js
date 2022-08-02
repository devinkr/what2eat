import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import AddRestaurant from './AddRestaurant';

jest.mock('axios');

function fillFormAndSubmit(screen, title) {
	const addButtonEl = screen.getByRole('button', { name: /add/i });
	const inputEl = screen.getByLabelText('restaurant / dish');
	fireEvent.change(inputEl, { target: { value: title } });
	fireEvent.click(addButtonEl);
}

const categories = [
	{ id: 1, owner: 'username', title: 'Asian Cuisine' },
	{ id: 3, owner: 'username', title: 'Fast Food' },
	{ id: 2, owner: 'username', title: 'Mexican' },
];

test('should show add restaurant form', () => {
	render(<AddRestaurant categories={categories} />);

	expect(screen.getByLabelText('restaurant / dish')).toBeVisible();
	expect(screen.getByRole('button', { name: /add/i })).toBeVisible();
});

describe('If API error', () => {
	test('should show error alert', async () => {
		render(<AddRestaurant categories={categories} />);
		const error = {
			response: {
				status: 0,
			},
		};

		axios.post.mockRejectedValueOnce(error);
		fillFormAndSubmit(screen, 'test');
		const alertEl = await screen.findByRole('alert');
		expect(alertEl).toBeVisible();
	});
});
