import { useState, useEffect } from 'react';
import { getAPIData } from '../../utils/useAxios';
import { signOut } from '../../utils/useAuth';
import Restaurants from '../Restaurants/Restaurants';
import AddCategory from '../AddCategory/AddCategory';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

function Categories({ setUserAuth }) {
	// State to track selected restaurants
	const [selected, setSelected] = useState(null);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);

	function makeRestaurantList(restaurants) {
		const initialSelected = {};
		restaurants.forEach((restaurant) => {
			initialSelected[restaurant.id] = {
				name: restaurant.name,
				checked: false,
			};
		});
		setSelected(initialSelected);
	}

	async function restaurantList() {
		const response = await getAPIData('restaurants');
		if (response.status === 200) {
			makeRestaurantList(response.data);
			categoryList();
		} else if (response.status === 401) {
			setUserAuth(null);
			signOut();
		} else {
			setError({ status: response.status, detail: response.detail });
		}
	}

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
		restaurantList();
	}, []);

	if (categories.length <= 0) {
		return null;
	}
	if (error) {
		return <div>Something went wrong, please try again later.</div>;
	}

	return (
		<>
			<Row>
				<Col md={5}>
					<h3 className='mb-4'>Categories:</h3>
				</Col>
				<Col md={7}>
					<AddCategory
						setError={setError}
						setUserAuth={setUserAuth}
						setCategories={setCategories}
					/>
				</Col>
			</Row>
			<Accordion defaultActiveKey='0'>
				<Form>
					{/* Map over categories and create an accordion for each category */}
					{categories.map((category, index) => (
						<Accordion.Item
							key={`categoryId-${category.id}`}
							eventKey={`${index}`}>
							<Accordion.Header>{category.title}</Accordion.Header>
							<Accordion.Body>
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
		</>
	);
}

export default Categories;
