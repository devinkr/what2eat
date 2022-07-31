import { useState } from 'react';
import { getAPIData, postAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function AddRestaurant({ categories, setCategories, setUserAuth }) {
	const initialFormState = { name: '', categories: [] };
	const [formState, setFormState] = useState(initialFormState);
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

	function handleChange(event) {
		setFormState({ ...formState, name: event.target.value });
	}

	function handleSelect(event) {
		const id = Number(event.target.dataset.id);
		if (formState.categories.includes(id)) {
			const updatedCategories = formState.categories.filter(
				(element) => element !== id
			);
			setFormState({ ...formState, categories: updatedCategories });
		} else {
			const updatedCategories = formState.categories;
			updatedCategories.push(id);
			setFormState({ ...formState, categories: updatedCategories });
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const response = await postAPIData('restaurants', formState);
		setFormState(initialFormState);
		if (response.status === 201) {
			categoryList();
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError({ status: response.status, detail: response.detail });
		}
	}

	if (categories.length > 0) {
		return (
			<>
				<h4>Add a restaurant / dish</h4>
				{error && (
					<div className='alert alert-danger' role='alert'>
						{error.detail}
					</div>
				)}
				<Form onSubmit={handleSubmit}>
					<InputGroup className='mb-3'>
						<Form.Control
							placeholder='name'
							aria-label='restaurant / dish'
							id='addRestaurant'
							required
							onChange={handleChange}
							value={formState.name}
						/>
					</InputGroup>
					<h5 className='ms-4'>Select categories:</h5>
					{categories.map((category) => {
						return (
							<Form.Check
								key={`addResCat-${category.id}`}
								inline
								type='checkbox'
								checked={formState.categories.includes(category.id)}
								id={`addRes-${category.id}`}
								data-id={category.id}
								label={category.title}
								onChange={handleSelect}
							/>
						);
					})}
					<div className='mt-3 d-flex justify-content-center'>
						<Button className='mb-4' type='submit' variant='outline-primary'>
							<i className='bi bi-cup-straw'> Add</i>
						</Button>
					</div>
				</Form>
			</>
		);
	}
}

export default AddRestaurant;
