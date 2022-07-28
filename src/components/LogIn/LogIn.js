import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// Login form designs from https://mdbootstrap.com/docs/standard/extended/login/

function LogIn({ setShowRegister }) {
	return (
		<Form>
			<p className='mt-4'>Please login to your account</p>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					placeholder='Username'
					aria-label='Username'
					id='username'
					autoFocus
				/>
			</InputGroup>
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					placeholder='password'
					aria-label='password'
					id='password'
					type='password'
				/>
			</InputGroup>
			<div className='text-center pt-1 mb-5 pb-1'>
				<Button variant='primary' className='btn-block mb-3'>
					Log in
				</Button>
			</div>

			<div className='d-flex align-items-center justify-content-center pb-4'>
				<p className='mb-0 me-2'>Don't have an account?</p>
				<Button variant='outline-danger' onClick={() => setShowRegister(true)}>
					Register
				</Button>
			</div>
		</Form>
	);
}

export default LogIn;
