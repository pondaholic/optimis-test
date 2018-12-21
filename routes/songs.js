const express = require('express');
const router = express.Router();

const Song = require('../models/songs');

router.get('/', (req, res, next) => {
	Song.find({})
		.sort({ album: 1 })
		.then(results => {
			res.json(results);
		})
		.catch(err => next(err));
});

router.get('/:album', (req, res, next) => {
	// console.info(req.params);
	const albumName = req.params;

	Song.find({ album: albumName.album })
		.sort({ name: 1 })
		.then(results => res.json(results))
		.catch(err => next(err));
});

module.exports = router;
