const itemList = document.querySelector('.item-list');
const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', (e) => {
		const item = e.target.parentElement;
		console.log([...itemList.children].indexOf(item));
	});
});
