import React from 'react';

export default function Card ({
	claps,
	description,
	idx,
	onDeleteCard,
	onEditCard,
	onInputFocus,
	readonly,
}) {
	return (
		<div className="card">
			<textarea
				className="textarea"
				rows={4}
				value={description}
				readOnly={readonly}
				onFocus={() => onInputFocus(idx)}
				onChange={(e) => onEditCard(idx, e.target.value)}
			/>
			<div className="controls">
				<button className="delete-button" onClick={() => onDeleteCard(idx)}>x</button>
				<button className="claps-button">
					<span className="clap-icon">👏</span>
					<span className="clap-count">x{claps}</span>
				</button>
			</div>
		</div>
	);
}
