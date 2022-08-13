import React from 'react';
import CardColumn from './components/card-column';

const completedItems = [
	{ description: 'Create a new branch', claps: 0, readonly: true },
];
const toImproveItems = [
	{ description: 'Add a new feature', claps: 0, readonly: true },
	{ description: 'Improve the design', claps: 0, readonly: true },
];
const actionItems = [
	{ description: 'Make Sure I follow up with client', claps: 0, readonly: true },
	{ description: 'Identify and resolve blockers', claps: 0, readonly: true },
	{ description: 'Remove placeholders', claps: 0, readonly: true },
];

export default function App () {
	return (
		<div className="app">
			<CardColumn title="Completed" initialItems={completedItems} />
			<CardColumn title="To Improve" initialItems={toImproveItems} />
			<CardColumn title="Action Items" initialItems={actionItems} />
		</div>
	);
}
