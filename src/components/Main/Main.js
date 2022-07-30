import React from 'react';
import Header from '../Header/Header';
import Content from '../Content/Content';

function Main({ setUserAuth }) {
	document.body.style.backgroundColor = '#f8f9fa';
	return (
		<>
			<Header setUserAuth={setUserAuth} />
			<Content setUserAuth={setUserAuth} />
		</>
	);
}

export default Main;
