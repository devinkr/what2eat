import React from 'react';
import Form from 'react-bootstrap/Form';

function Restaurants({ restaurants, selected, setSelected }) {
	
  // Using state to track selected restaurants so when you check a restaurant the same restaurant in another category
  // will also be checked.
  function handleSelect(event) {
		const target = event.target;
		
    // If checked then set checked to true in state for that restaurant
    if (target.checked) {
			setSelected({
				...selected,
				[target.dataset.id]: { name: target.dataset.name, checked: true },
			});
		} else {
      // Set checked to false in state for that restaurant
			setSelected({
				...selected,
				[target.dataset.id]: { name: target.dataset.name, checked: false },
			});
		}
	}
	if (restaurants.length > 0) {
		return (
			<>
        {/* Map over the restaurants and render as a checkbox */}
				{restaurants.map((restaurant) => {
					return (
						<Form.Check
							key={`restaurantId-${restaurant.id}`}
              // Checkboxes are controlled components so one restaurant that is
              // checked updates the same restaurant in other categories
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
