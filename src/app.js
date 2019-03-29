const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather app',
		name: 'Kase'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About page',
		name: 'Kase'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		help: 'pomoooooc',
		title: 'Help page',
		name: 'Kase'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'you must provide an address'
		});
	}
	const address = req.query.address;
	geocode(address, (err, { latitude, longitude, name } = {}) => {
		if (err) {
			return res.send({ err });
		}
		forecast(latitude, longitude, (err, weather) => {
			if (err) {
				return res.send(err);
			}
			res.send({
				location: name,
				weather: weather
			});
		});
	});
});

app.get('/products', (req, res) => {
	if (req.query.search) {
		res.send({
			products: []
		});
		console.log(req.query);
	} else {
		res.send({
			error: 'You must provide search term'
		});
	}
});

app.get('/help/*', (req, res) => {
	res.render('error-page', {
		error: 'help article does not exist'
	});
});

app.get('*', (req, res) => {
	res.render('error-page', {
		error: 'page not found'
	});
});

app.listen(port, () => {
	console.log('server running');
});
