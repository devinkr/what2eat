import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Categories from './Categories';

jest.mock('axios');

// API responses
const emptyCategories = {
	status: 200,
	data: [],
};

const categoryList = {
	status: 200,
	data: [
		{
			id: 1,
			title: 'test',
			owner: 'username',
			restaurants: [
				{ id: 1, name: 'Taco Bell', owner: 'username', categories: [1] },
			],
		},
	],
};

const categoryCreated = {
	status: 201,
	data: {
		id: 1,
		title: 'test',
		owner: 'username',
		restaurants: [],
	},
};

const restaurantCreated = {
	status: 201,
	data: {
		id: 2,
		name: 'Taco Time',
		owner: 'username',
		categories: [1],
	},
};

function fillFormAndSubmit(screen, title) {
	const addCategoryEl = screen.getByRole('button', { name: 'Add' });
	const inputEl = screen.getByLabelText('add category');
	fireEvent.change(inputEl, { target: { value: title } });
	fireEvent.click(addCategoryEl);
}

test('should render welcome when there are no categories', async () => {
	axios.get.mockResolvedValueOnce(emptyCategories);
	render(<Categories />);
	const welcomeEl = await screen.findByRole('heading', {
		level: 4,
		name: /welcome/i,
	});
	expect(welcomeEl).toBeVisible();
});

test('should render category with restaurants', async () => {
	axios.get.mockResolvedValueOnce(categoryList);
	render(<Categories selected={{}} />);
	const accordionCategory = await screen.findByRole('button', {
		name: /test/i,
	});
	const checkboxCategory = await screen.findByRole('checkbox', {
		name: /test/i,
	});
	const restaurant = await screen.findByRole('checkbox', {
		name: /taco bell/i,
	});
	expect(accordionCategory).toBeVisible();
	expect(checkboxCategory).toBeVisible();
	expect(restaurant).toBeVisible();
});

test('should render category after being added', async () => {
	axios.get.mockResolvedValueOnce(emptyCategories);
	axios.post.mockResolvedValueOnce(categoryCreated);
	axios.get.mockResolvedValueOnce(categoryList);
	render(<Categories selected={{}} />);

	fillFormAndSubmit(screen, 'test');
	const accordionCategory = await screen.findByRole('button', {
		name: /test/i,
	});
	const checkboxCategory = await screen.findByRole('checkbox', {
		name: /test/i,
	});
	expect(accordionCategory).toBeVisible();
	expect(checkboxCategory).toBeVisible();
});

test('should render restaurant after being added', async () => {
	const categoryListUpdated = {
		status: 200,
		data: [
			{
				id: 1,
				title: 'test',
				owner: 'username',
				restaurants: [
					{ id: 1, name: 'Taco Bell', owner: 'username', categories: [1] },
					{ id: 2, name: 'Taco Time', owner: 'username', categories: [1] },
				],
			},
		],
	};
	axios.get.mockResolvedValueOnce(categoryListUpdated);
	axios.post.mockResolvedValueOnce(restaurantCreated);
	render(<Categories selected={{}} />);
	const buttonEl = await screen.findByRole('button', { name: /add/i });
	const inputEl = await screen.findByPlaceholderText('name');
	fireEvent.change(inputEl, { target: { value: 'Taco Time' } });
	fireEvent.click(buttonEl);
	const restaurant = await screen.findByRole('checkbox', {
		name: /taco time/i,
	});
	expect(restaurant).toBeVisible();
});
