import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';
import './styles/index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
