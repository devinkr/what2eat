import { signOut } from '../../utils/useAuth';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function Header({ setUserAuth }) {
	function handleSignOut() {
		setUserAuth(null);
		signOut();
	}
	return (
		<header>
			<Navbar className='dark-bg navbar-dark shadow'>
				<Container>
					<Navbar.Brand>
						<img
							src={process.env.PUBLIC_URL + 'assets/What2Eat-logos_white.png'}
							alt='What2Eat Logo'
							style={{ height: '60px' }}
						/>
					</Navbar.Brand>
					<Nav className='ms-auto align-items-center'>
						<Button
							variant='light'
							className='rounded-pill'
							onClick={handleSignOut}>
							Sign Out
						</Button>
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
