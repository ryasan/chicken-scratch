import React from 'react';

// Utilities
function fetchTodos () {
	return fetch('https://jsonplaceholder.typicode.com/todos')
		.then(res => res.json())
		.catch(err => console.log(err));
}

function fetchRandomNumber () {
	return new Promise(resolve => {
		setTimeout(() => resolve(Math.floor(Math.random() * 10)), 3000);
	});
}

function wrapPromise (promise) {
	let status = 'pending';
	let result;

	let suspender = promise.then(
		res => {
			status = 'success';
			result = res;
		},
		err => {
			status = 'error';
			result = err;
		}
	);

	return {
		read () {
			if (status === 'pending') {
				throw suspender;
			} else if (status === 'error') {
				throw result;
			} else if (status === 'success') {
				return result;
			}
		}
	};
}

function createResource () {
	return {
		todos: wrapPromise(fetchTodos()),
		number: wrapPromise(fetchRandomNumber())
	};
}

const resource = createResource();

// Components
function Todos () {
	const todos = resource.todos.read();
	return (
		<ul>
			{todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
		</ul>
	);
}

function RandomNumber () {
	const number = resource.number.read();
	return <h1>{number}</h1>;
}

export default function App () {
	return (
		<div>
			<React.Suspense fallback={<h1>Loading Number...</h1>}>
				<RandomNumber />
			</React.Suspense>
			<React.Suspense fallback={<h1>Loading Todos...</h1>}>
				<Todos />
			</React.Suspense>
		</div>
	);
}
