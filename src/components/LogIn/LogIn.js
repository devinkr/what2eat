import { useState } from 'react';
import { getToken, saveToken } from '../../utils/useAuth';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// Login form designs from https://mdbootstrap.com/docs/standard/extended/login/

function LogIn({ setShowRegister, setUserAuth }) {
	const blankFormState = { username: '', password: '' };
	const [formState, setFormState] = useState(blankFormState);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();
		setFormState(blankFormState);
		setLoading(true);

		// Get Auth Token. On success set state with token and save to local storage otherwise display error.
		const response = await getToken(formState.username, formState.password);
		setLoading(false);
		if (response.status === 200) {
			setError(null);
			setUserAuth(response.data);
			saveToken(response.data);
		} else if (response.status === 401) {
			setError({ status: response.status, detail: response.data.detail });
		} else {
			setError({
				status: 'other',
				detail: 'Something went wrong. Please try again later.',
			});
		}
	}

	function handleChange(event) {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	}

	return (
		<Form onSubmit={handleSubmit}>
			<p className='mt-4'>Please login to your account</p>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					className={error && 'is-invalid'}
					placeholder='Username'
					aria-label='Username'
					id='username'
					autoFocus
					required
					value={formState.username}
					onChange={handleChange}
				/>
			</InputGroup>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					className={error && 'is-invalid'}
					placeholder='password'
					aria-label='password'
					id='password'
					type='password'
					required
					value={formState.password}
					onChange={handleChange}
				/>
			</InputGroup>
			{error && (
				<div className='alert alert-danger' role='alert'>
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
					<Button type='submit' variant='primary' className='btn-block mb-3'>
						Log in
					</Button>
				)}
			</div>

			<div className='d-flex align-items-center justify-content-center pb-4'>
				<p className='mb-0 me-2'>Don't have an account?</p>
				<Button
					type='button'
					variant='outline-danger'
					onClick={() => setShowRegister(true)}>
					Register
				</Button>
			</div>
		</Form>
	);
}

export default LogIn;
