import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import AddCategory from './AddCategory';

jest.mock('axios');

test('should show add category form', () => {
	render(<AddCategory />);

	expect(screen.getByLabelText('add category')).toBeVisible();
	expect(screen.getByRole('button', { name: /add/i })).toBeVisible();
});

