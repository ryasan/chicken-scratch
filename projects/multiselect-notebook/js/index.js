const checkboxes = document.querySelectorAll('.checkbox');

let prevIdx;
let currIdx;

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('click', function (e) {
		prevIdx = currIdx;
		currIdx = [...checkboxes].indexOf(this);

		if (e.shiftKey) {
			const start = Math.min(prevIdx, currIdx);
			const end = Math.max(prevIdx, currIdx) + 1;

			[...checkboxes].slice(start, end).forEach(checkbox => {
				checkbox.checked = this.checked;
			});
		}
	});
});
