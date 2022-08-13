import React from 'react';

export default function AddCard ({
	title,
	onAddCard,
}) {
	return (
		<div className="add-card">
			<h2>{title}</h2>
			<button className="add-button" onClick={onAddCard}>+</button>
		</div>
	);
}
