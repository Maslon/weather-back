const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoibWFzbG8iLCJhIjoiY2pxaDB0MGd5MDcycDQ4cXk2MDIwOWN2YyJ9.hq1pxl34G189y_40DwsJBQ&limit=1`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connects to location services');
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				name: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
