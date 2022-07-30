import { useState } from 'react';
import { getAPIData, postAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function AddCategory({ setUserAuth, setCategories }) {
	const [formState, setFormState] = useState('');
	const [error, setError] = useState(null);

	async function categoryList() {
		const response = await getAPIData('categories');
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
		const response = await postAPIData('categories', { title: formState });
		setFormState('');
		if (response.status === 201) {
			categoryList();
		} else if (response.status === 401) {
			console.log('I got to this part');
			setUserAuth(null);
			signOut();
		} else {
			setError({ status: response.status, detail: response.detail });
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
				<Button type='submit' variant='primary'>
					Add
				</Button>
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
