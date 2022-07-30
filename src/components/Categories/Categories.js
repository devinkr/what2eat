import { useState } from 'react';
import Restaurants from '../Restaurants/Restaurants';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import { restaurantList, categoryList } from './data';

function Categories(props) {
	const initialSelected = {};
	restaurantList.forEach((restaurant) => {
		initialSelected[restaurant.id] = {
			name: restaurant.name,
			checked: false,
		};
	});
	// State to track selected restaurants
	const [selected, setSelected] = useState(initialSelected);

	return (
		<>
			<h3 className='mb-4'>Categories:</h3>
			<Accordion defaultActiveKey='0'>
				<Form>
					{/* Map over categories and create an accordion for each category */}
					{categoryList.map((category, index) => (
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
