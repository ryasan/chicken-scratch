import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const handleError = err => {
	if (err.name === 'AbortError') {
		console.log('Request aborted!');
	}
};

export default function App () {
	const location = useLocation();
	const userId = location.pathname.split('/')[1];
	const [user, setUser] = React.useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;
		fetch(`https://jsonplaceholder.typicode.com/users/${ userId }`, { signal })
			.then(res => res.json())
			.then(setUser)
			.catch(handleError);

		return () => {
			controller.abort();
		};
	}, [userId]);

	return (
		<div className="app">
			<h1>Users</h1>

			<div className="links">
				<Link to="/1">User 1</Link> |{' '}
				<Link to="/2">User 2</Link> |{' '}
				<Link to="/3">User 3</Link>
			</div>

			{user && (
				<div className="user-info">
					<strong>Name: {user.name}</strong>
					<p>Email: {user.email}</p>
					<p>Phone: {user.phone}</p>
				</div>
			)}
		</div>
	);
}
