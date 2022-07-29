import { useState } from 'react';
import LogIn from '../LogIn/LogIn';
import Register from '../Register/Register';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Login form designs from https://mdbootstrap.com/docs/standard/extended/login/

function Home({ setUserAuth }) {
	const [showRegister, setShowRegister] = useState(false);

	return (
		<Container className='dark-bg py-5 h-100'>
			<Row className='d-flex justify-content-center align-items-center h-100'>
				<Col className='col-xl-10'>
					<Card className='rounded-3 text-black'>
						<Row className='g-0'>
							<Col className='col-12 col-md-6'>
								<Card.Body className='mx-4'>
									<div className='text-center'>
										<img
											src={
												process.env.PUBLIC_URL +
												'assets/What2Eat-logos_black.png'
											}
											alt='logo'
											style={{ width: '100%' }}
										/>
									</div>
									{showRegister ? (
										<Register setShowRegister={setShowRegister} />
									) : (
										<LogIn
											setShowRegister={setShowRegister}
											setUserAuth={setUserAuth}
										/>
									)}
								</Card.Body>
							</Col>
							<Col className='col-12 col-md-6 d-flex align-items-center about'>
								<div className='text-black mx-4 px-3 py-4'>
									<h4 className='mb-4'>Can't decide what to eat?</h4>
									<p>
										For those nights when you are fighting over whose turn it is
										to pick, What2Eat makes it simple.
									</p>
									<p>
										Create categories to group food options and then add
										restaurants/meals to those categories. Highlight the ones
										you are in the mood for today and let What2Eat decide.
									</p>
									<p>
										What2Eat can pick a restaurant for you, or choose what dish
										you should cook. The possibilities are limitless.
									</p>
								</div>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Home;
