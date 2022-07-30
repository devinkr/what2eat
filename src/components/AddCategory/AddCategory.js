import { getAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function AddCategory({ setError, setUserAuth, setCategories }) {
	
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

	function handleSubmit(event) {
		event.preventDefault();
		console.log('You clicked');
	}

	return (
		<Form onSubmit={handleSubmit}>
			<InputGroup className='form-outline mb-3'>
				<Form.Control
					placeholder='add category'
					aria-label='add category'
					id='addcategory'
					required
				/>
				<Button type='submit' variant='primary'>
					Add
				</Button>
			</InputGroup>
		</Form>
	);
}

export default AddCategory;
