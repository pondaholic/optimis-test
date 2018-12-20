const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { PORT, MONGODB_URI } = require('./config');
const albumsRouter = require('./routes/albums');
const songsRouter = require('./routes/songs');

const app = express();

app.use(morgan('dev'));

app.use('/api/albums', albumsRouter);
app.use('/api/songs', songsRouter);

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, next) => {
	if (err.status) {
		const errBody = Object.assign({}, err, { message: err.message });
		res.status(err.status).json(errBody);
	} else {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

mongoose
	.connect(MONGODB_URI)
	.then(instance => {
		const conn = instance.connections[0];
		console.info(
			`Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
		);
	})
	.catch(err => {
		console.error(`ERROR: ${err.message}`);
		console.error('\n === Did you remember to start `mongod`? === \n');
		console.error(err);
	});

app
	.listen(PORT, function() {
		console.info(`Server listening on ${this.address().port}`);
	})
	.on('error', err => {
		console.error(err);
	});

module.exports = app;
