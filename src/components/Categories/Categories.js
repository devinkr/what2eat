import { useState, useEffect } from 'react';
import { getAPIData, deleteAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Welcome from '../Welcome/Welcome';
import Restaurants from '../Restaurants/Restaurants';
import AddCategory from '../AddCategory/AddCategory';
import AddRestaurant from '../AddRestaurant/AddRestaurant';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Categories({ setUserAuth, selected, setSelected }) {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);

// Update categories list from API
	async function categoryList() {
		const response = await getAPIData('categories');
		if (response.status === 200) {
			setCategories(response.data);
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError(true);
		}
	}

	// On first mount get list of categories and save to state
	useEffect(() => {
		categoryList();
	}, []);


	// DELETE category and then request categories list from API
	async function handleCategoryDelete(id) {
		const response = await deleteAPIData(`categories/${id}`);
		if (response.status === 204) {
			categoryList();
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError(true);
		}
	}

	// If categories list is empty then show Welcome message with instructions.
	if (categories.length <= 0) {
		return (
			<>
				<Row>
					<Col md={5}>
						<h3 className='mb-4'>Categories:</h3>
					</Col>
					<Col md={7}>
						<AddCategory
							setUserAuth={setUserAuth}
							setCategories={setCategories}
						/>
					</Col>
				</Row>
				<Row>
					<Col className='px-5 mt-4'></Col>
					<Welcome />
				</Row>
			</>
		);
	}

	return (
		<>
			{error && (
				<div className='alert alert-danger' role='alert'>
					Something went wrong. Try again later.
				</div>
			)}
			<Row>
				<Col md={5}>
					<h3 className='mb-4'>Categories:</h3>
				</Col>
				<Col md={7}>
					<AddCategory
						setUserAuth={setUserAuth}
						setCategories={setCategories}
					/>
				</Col>
			</Row>
			<Accordion>
				<Form>
					{/* Map over categories and create an accordion for each category */}
					{categories.map((category) => (
						<Accordion.Item
							key={`categoryId-${category.id}`}
							eventKey={`${category.id}`}>
							<Accordion.Header>{category.title}</Accordion.Header>
							<Accordion.Body>
								<Button
									variant='outline-danger'
									onClick={() => handleCategoryDelete(category.id)}>
									<i className='bi bi-trash'>Delete Category</i>
								</Button>

								{/* Render list of restaurants for the category */}
								<Restaurants
									key={`restaurant-list-${category.id}`}
									restaurants={category.restaurants}
									selected={selected}
									setSelected={setSelected}
								/>
							</Accordion.Body>
						</Accordion.Item>
					))}
				</Form>
			</Accordion>
			<Row className='mt-4'>
				<Col>
					<AddRestaurant
						setUserAuth={setUserAuth}
						categories={categories}
						setCategories={setCategories}
					/>
				</Col>
			</Row>
		</>
	);
}

export default Categories;
