import { useState } from 'react';
import Main from './components/Main/Main';
import Home from './components/Home/Home';

function App() {
	let user = null;
	if (localStorage.getItem('authToken')) {
		user = JSON.parse(localStorage.getItem('authToken'));
	}
	const [userAuth, setUserAuth] = useState(user);

	return userAuth ? <Main /> : <Home setUserAuth={setUserAuth} />;
}

export default App;
