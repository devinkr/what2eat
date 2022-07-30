import Categories from '../Categories/Categories';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Content(props) {
	return (
		<Container className='bg-light mt-3'>
			<Row>
				<Col md={6}>
					{' '}
					<img
						src={process.env.PUBLIC_URL + 'assets/wheel.jpg'}
						alt=''
						style={{ width: '100%' }}
					/>
				</Col>
				<Col md={6}>
					<Categories />
				</Col>
			</Row>
		</Container>
	);
}

export default Content;
