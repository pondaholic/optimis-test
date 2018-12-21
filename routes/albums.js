const express = require('express');
const router = express.Router();

const Album = require('../models/albums');

router.get('/', (req, res, next) => {
	Album.find({})
		.sort({ name: 1 })
		.then(results => {
			res.json(results);
		})
		.catch(err => next(err));
});

router.get('/:album', (req, res, next) => {
	// console.info(req.params);
	const albumName = req.params;

	Album.find({ name: albumName.album })
		.then(results => res.json(results))
		.catch(err => next(err));
});

module.exports = router;
