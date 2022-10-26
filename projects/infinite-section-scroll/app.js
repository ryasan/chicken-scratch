import React from 'react';

export default function App () {
	const sectionRef = React.useRef(null);
	const [top, setTop] = React.useState(0);

	React.useEffect(() => {
		if (!sectionRef.current) return;

		const interval = setInterval(() => {
			setTop(prevTop => prevTop + sectionRef.current.offsetHeight);
		}, 3000);

		return () => clearInterval(interval);
	}, [sectionRef]);

	React.useEffect(() => {
		if (top >= document.body.offsetHeight) {
			return setTop(0);
		}

		window.scrollTo({
			top,
			behavior: 'smooth'
		});
	}, [top]);

	return (
		<div>
			<section ref={sectionRef} />
			<section />
			<section />
			<section />
			<section />
		</div>
	);
}
