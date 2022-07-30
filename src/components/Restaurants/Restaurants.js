import React from 'react';
import Form from 'react-bootstrap/Form';

function Restaurants({ restaurants, selected, setSelected }) {
	function handleSelect(event) {
		const target = event.target;
		if (target.checked) {
			setSelected({
				...selected,
				[target.dataset.id]: { name: target.dataset.name, checked: true },
			});
		} else {
			setSelected({
				...selected,
				[target.dataset.id]: { name: target.dataset.name, checked: false },
			});
		}
	}
	if (restaurants.length > 0) {
		return (
			<>
				{restaurants.map((restaurant) => {
					return (
						<Form.Check
							key={`restaurantId-${restaurant.id}`}
							checked={selected[restaurant.id].checked}
							inline
							type='checkbox'
							id={`restaurantId-${restaurant.id}`}
							data-id={restaurant.id}
							data-name={restaurant.name}
							label={restaurant.name}
							onChange={handleSelect}
						/>
					);
				})}
			</>
		);
	} else {
		return null;
	}
}

export default Restaurants;
