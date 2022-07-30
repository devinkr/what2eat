import { useState } from 'react';
import Main from './components/Main/Main';
import Home from './components/Home/Home';

function App() {
	let user = null;
	// Get user token from local storage
	if (localStorage.getItem('authToken')) {
		user = JSON.parse(localStorage.getItem('authToken'));
	}
	// Track logged in status with userAuth state
	const [userAuth, setUserAuth] = useState(user);

	// If user is logged in render Main component otherwise render Home component
	// which contains login and register forms.
	return userAuth ? (
		<Main setUserAuth={setUserAuth} />
	) : (
		<Home setUserAuth={setUserAuth} />
	);
}

export default App;
