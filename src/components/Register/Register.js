import { useState } from 'react';
import { createAccount } from '../../utils/useAuth';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// Login form designs from https://mdbootstrap.com/docs/standard/extended/login/

function Register({ setShowRegister }) {
	const blankFormState = { username: '', password: '', password2: '' };
	const [formState, setFormState] = useState(blankFormState);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setFormState(blankFormState);
		setLoading(true);

		const response = await createAccount(
			formState.username,
			formState.password,
			formState.password2
		);
		setLoading(false);
		if (response.status === 201) {
			setError(null);
			setShowRegister(false);
		} else if (response.status === 400) {
			setError({ status: response.status, detail: response.data });
		} else {
			setError({
				status: 'other',
				detail: 'Something went wrong. Please try again later.',
			});
		}
	}

	function handleChange(event) {
		setFormState({ ...formState, [event.target.id]: event.target.value });
		if (event.target.id === 'password2') {
			if (formState.password !== event.target.value) {
				setError({
					status: 'noMatch',
					detail: 'Passwords must match',
				});
			} else {
				setError(null);
			}
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<p className='mt-4'>Please register your account</p>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					className={error?.detail.username && 'is-invalid'}
					placeholder='Username'
					aria-label='Username'
					id='username'
					autoFocus
					required
					value={formState.username}
					onChange={handleChange}
				/>
				{error?.detail.username && (
					<div className='invalid-feedback'>{error.detail.username}</div>
				)}
			</InputGroup>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					className={error?.detail.password && 'is-invalid'}
					placeholder='password'
					aria-label='password'
					id='password'
					type='password'
					required
					value={formState.password}
					onChange={handleChange}
				/>
				{error?.detail.password && (
					<div className='invalid-feedback'>{error.detail.password}</div>
				)}
			</InputGroup>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					className={error?.status === 'noMatch' && 'is-invalid'}
					placeholder='confirm password'
					aria-label='confirm password'
					id='password2'
					type='password'
					required
					value={formState.password2}
					onChange={handleChange}
				/>
				{error?.status === 'noMatch' && (
					<div className='invalid-feedback'>{error.detail}</div>
				)}
			</InputGroup>
			{error?.status === 'other' && (
				<div class='alert alert-danger' role='alert'>
					{error.detail}
				</div>
			)}

			<div className='text-center pt-1 mb-5 pb-1'>
				{loading ? (
					<Button
						type='submit'
						variant='primary'
						className='btn-block mb-3'
						disabled>
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
						/>
						Loading...
					</Button>
				) : (
					<Button
						type='submit'
						variant='primary'
						className='btn-block mb-3'
						disabled={error?.status === 'noMatch'}>
						Register
					</Button>
				)}
			</div>

			<div className='d-flex align-items-center justify-content-center pb-4'>
				<p className='mb-0 me-2'>Return to the Login Page?</p>
				<Button
					type='button'
					variant='outline-danger'
					onClick={() => setShowRegister(false)}>
					Go Back
				</Button>
			</div>
		</Form>
	);
}

export default Register;
