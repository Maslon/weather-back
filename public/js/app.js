console.log('clientside js loaded');

const form = document.querySelector('.form');
const input = document.querySelector('.address-input');
const locationOutput = document.querySelector('.location');
const forecastOutput = document.querySelector('.forecast');

form.addEventListener('submit', e => {
	locationOutput.innerText = 'Loading...';
	e.preventDefault();
	fetch(`/weather?address=${input.value}`).then(res => {
		res.json().then(data => {
			console.log(data.err);
			if (data.err) {
				return (locationOutput.innerText = data.err);
			}
			locationOutput.innerText = data.location;
			forecastOutput.innerText = data.weather;
		});
	});
});
