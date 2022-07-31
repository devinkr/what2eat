import React from 'react';
import Form from 'react-bootstrap/Form';

function Restaurants({ restaurants, selected, setSelected }) {
	function isSelected(id) {
		if (selected.hasOwnProperty(id)) return true;
		return false;
	}

	// Using state to track selected restaurants so when you check a restaurant the same restaurant in another category
	// will also be checked.
	function handleSelect(event) {
		const target = event.target;

		if (isSelected(target.dataset.id)) {
			const selectedCopy = { ...selected };
			delete selectedCopy[target.dataset.id];
			setSelected(selectedCopy);
		} else {
			setSelected({
				...selected,
				[target.dataset.id]: { name: target.dataset.name },
			});
		}
	}

	if (restaurants.length > 0 && selected) {
		return (
			<div>
				{/* Map over the restaurants and render as a checkbox */}
				{restaurants.map((restaurant) => {
					return (
						<Form.Check
							key={`restaurantId-${restaurant.id}`}
							// Checkboxes are controlled components so one restaurant that is
							// checked updates the same restaurant in other categories
							checked={isSelected(restaurant.id)}
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
			</div>
		);
	} else {
		return null;
	}
}

export default Restaurants;
