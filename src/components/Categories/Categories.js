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
	const [selected, setSelected] = useState(initialSelected);

	return (
		<>
			<h3 className='mb-4'>Categories:</h3>
			<Accordion defaultActiveKey='0'>
				<Form>
					{categoryList.map((category, index) => (
						<Accordion.Item
							key={`categoryId-${category.id}`}
							eventKey={`${index}`}>
							<Accordion.Header>{category.title}</Accordion.Header>
							<Accordion.Body>
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
