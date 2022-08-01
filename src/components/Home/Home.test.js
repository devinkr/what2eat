import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

test('should show login component by default', () => {
	render(<Home />);
	expect(screen.getByText(/please login/i)).toBeVisible();
	expect(screen.getByRole('button', { name: /register/i })).toBeVisible();
});

test('should toggle LogIn and Register components when button is clicked', async () => {
	render(<Home />);
	const registerEl = screen.getByRole('button', { name: /register/i });
	fireEvent.click(registerEl);
	const registerTextEl = await screen.findByText(/please register/i);
	const goBackEl = await screen.findByRole('button', { name: /go back/i });
	expect(registerTextEl).toBeVisible();
	expect(goBackEl).toBeVisible();
	fireEvent.click(goBackEl);
	const loginTextEl = await screen.findByText(/please login/i);
	expect(loginTextEl).toBeVisible();
});
