import React from 'react';

function Welcome(props) {
	return (
		<div>
			<h4>Welcome!</h4>
			<p>
				To get started add a category above. Categories can be things like{' '}
				<strong>Fast Food</strong>, <strong>Mexican</strong>,{' '}
				<strong>Cheap</strong>, <strong>Take Out</strong>,{' '}
				<strong>Sit Down</strong>, etc.{' '}
			</p>
			<p>
				The category could even be something like <strong>Cook At Home</strong>{' '}
				where you list dishes you like to cook.
			</p>
			<p>
				Once you have added at least one category, you will be able to add
				choices.
			</p>
			<p>
				The same choice can be in more than one category. EG:{' '}
				<strong>Taco Bell</strong> could be listed in <strong>Fast Food</strong>
				, <strong>Cheap</strong>, and <strong>Mexican</strong> (That last
				category is controversial).
			</p>
			<p>
				Add a category and let <strong>WHERE2EAT</strong> decide for you.
			</p>
		</div>
	);
}

export default Welcome;
