import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Container from 'react-bootstrap/Container';

function AddRestaurant(props) {
	return (
		<>
			<h3>Add a restaurant:</h3>
			<Button variant='outline-primary'>
				<i className='bi bi-cup-straw'> Add restaurant</i>
			</Button>
		</>
	);
}

export default AddRestaurant;
