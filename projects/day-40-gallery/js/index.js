const imageList = document.querySelectorAll('img');

imageList.forEach(function (image) {
	image.addEventListener('click', function () {
		this.classList.toggle('active');
		this.classList.add('is-ticking');

		imageList.forEach(sibling => {
			if (sibling !== this) sibling.classList.toggle('hidden');
		});
	});

	image.addEventListener('transitionend', function () {
		if (this.classList.contains('is-ticking')) {
			this.classList.remove('is-ticking');
		}
	});
});
