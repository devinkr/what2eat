import { useState } from 'react';
import { getAPIData, postAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function AddCategory({ setUserAuth, setCategories }) {
	const [formState, setFormState] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	async function categoryList() {
		const response = await getAPIData('categories');
		setLoading(false);
		if (response.status === 200) {
			setCategories(response.data);
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError({ status: response.status, detail: response.detail });
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		const response = await postAPIData('categories', { title: formState });
		setFormState('');
		if (response.status === 201) {
			categoryList();
		} else if (response.status === 401) {
			setLoading(false);
			setUserAuth(null);
			signOut();
		} else {
			setLoading(false);
			setError(true);
		}
	}

	function handleChange(event) {
		setFormState(event.target.value);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className='mb-3'>
				<Form.Control
					className={error && 'is-invalid'}
					placeholder='add category'
					aria-label='add category'
					id='addcategory'
					required
					onChange={handleChange}
					value={formState}
				/>
				{loading ? (
					<Button variant='primary' disabled>
						<Spinner
							as='span'
							animation='border'
							size='sm'
							role='status'
							aria-hidden='true'
						/>{' '}
						Loading...
					</Button>
				) : (
					<Button type='submit' variant='primary'>
						Add
					</Button>
				)}
				{error && (
					<div className='invalid-feedback'>
						Something went wrong. Try again later.
					</div>
				)}
			</InputGroup>
		</Form>
	);
}

export default AddCategory;
