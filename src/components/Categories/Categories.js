import { useState, useEffect } from 'react';
import { getAPIData, deleteAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
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

	useEffect(() => {
		categoryList();
	}, []);

	async function handleDelete(id) {
		const response = await deleteAPIData(`categories/${id}`);
		if (response.status === 204) {
			categoryList();
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError({ status: response.status, detail: response.detail });
		}
	}

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
					<Col className='px-5 mt-4'>
						<h4>Welcome!</h4>
						<p>
							To get started add a category above. Categories can be things like{' '}
							<strong>Fast Food</strong>, <strong>Mexican</strong>,{' '}
							<strong>Cheap</strong>, <strong>Take Out</strong>,{' '}
							<strong>Sit Down</strong>, etc.{' '}
						</p>
						<p>
							The category could even be something like{' '}
							<strong>Cook At Home</strong> where you list dishes you like to
							cook.
						</p>
						<p>
							Once you have added at least one category, you will be able to add
							choices.
						</p>
						<p>
							The same choice can be in more than one category. EG:{' '}
							<strong>Taco Bell</strong> could be listed in{' '}
							<strong>Fast Food</strong>, <strong>Cheap</strong>, and{' '}
							<strong>Mexican</strong> (That last category is controversial).
						</p>
						<p>
							Add a category and let <strong>WHERE2EAT</strong> decide for you.
						</p>
					</Col>
				</Row>
			</>
		);
	}

	return (
		<>
			{error && (
				<div className='alert alert-danger' role='alert'>
					{error.detail}
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
								<div className='d-flex justify-content-end'>
									<Button
										variant='outline-danger'
										onClick={() => handleDelete(category.id)}>
										<i className='bi bi-trash'>Delete Category</i>
									</Button>
								</div>

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
