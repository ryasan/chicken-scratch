import React from 'react';
import AddCard from './add-card';
import Card from './card';

export default function CardColumn ({
	title,
	initialItems = [],
}) {
	const [items, setItems] = React.useState([...initialItems]);

	function handleInputFocus (activeIdx) {
		setItems(prevItems => prevItems.map((item, idx) => ({
			...item,
			readonly: idx !== activeIdx,
		})));
	}

	function handleEditCard (activeIdx, updatedDescription) {
		setItems(prevItems => prevItems.map((item, idx) => ({
			...item,
			description: idx === activeIdx ? updatedDescription : item.description,
		})));
	}

	function handleAddCard () {
		setItems(prevItems => [...prevItems, {
			description: '',
			claps: 0,
			readonly: false,
		}]);
	}

	function handleDeleteCard (idx) {
		setItems(prevItems => prevItems.filter((item, i) => i !== idx));
	}

	return (
		<div
			className="card-column"
			onBlur={() => handleInputFocus(-1)}
		>
			<AddCard
				title={title}
				onAddCard={handleAddCard}
			/>
			{items.map((item, idx) => (
				<Card
					key={idx}
					idx={idx}
					onEditCard={handleEditCard}
					onDeleteCard={handleDeleteCard}
					onInputFocus={handleInputFocus}
					{...item}
				/>
			))}
		</div>
	);
}
