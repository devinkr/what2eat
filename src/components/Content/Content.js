import { useState } from 'react';
import Wheel from '../Wheel/Wheel';
import Categories from '../Categories/Categories';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Content({ setUserAuth }) {
	// State to track selected restaurants
	const [selected, setSelected] = useState({});

	return (
		<Container className='bg-light mt-3'>
			<Row>
				<Col md={6} className='mb-3'>
					<h3 className='mb-4'>
						Select what you're in the mood for then click the wheel to spin
					</h3>
					<Wheel items={Object.values(selected)} />
				</Col>
				<Col md={6}>
					<Categories
						setUserAuth={setUserAuth}
						selected={selected}
						setSelected={setSelected}
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default Content;
