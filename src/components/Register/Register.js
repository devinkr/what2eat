import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// Login form designs from https://mdbootstrap.com/docs/standard/extended/login/

function Register({ setShowRegister }) {
	return (
		<Form>
			<p className='mt-4'>Please register an account</p>
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
			<InputGroup className='form-outline mb-4'>
				<Form.Control
					placeholder='confirm password'
					aria-label='confirm password'
					id='password2'
					type='password'
				/>
			</InputGroup>
			<div className='text-center pt-1 mb-5 pb-1'>
				<Button variant='primary' className='btn-block mb-3'>
					Register
				</Button>
			</div>

			<div className='d-flex align-items-center justify-content-center pb-4'>
				<Button variant='outline-danger' onClick={() => setShowRegister(false)}>
					Return to Log in
				</Button>
			</div>
		</Form>
	);
}

export default Register;
