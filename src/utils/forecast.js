const request = require('request');

const forecast = (lat, lng, callback) => {
	const url = `https://api.darksky.net/forecast/d28f751d03b5bf4f0bf1fc2e9d5f92ed/${lat},${lng}?units=si`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to the weather service');
		} else if (body.error) {
			callback(body.error);
		} else {
			callback(
				undefined,
				`${body.daily.data[0].summary} It is currently ${body.currently
					.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`
			);
		}
	});
};

module.exports = forecast;
