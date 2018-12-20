const express = require('express');
const router = express.Router();

const Album = require('../models/albums');
const Song = require('../models/songs');

router.get('/', (req, res, next) => {
	console.info(req.params);
	const { album } = req.params;
	const albumName = album;

	Song.find({ album: albumName })
		.then(results => {
			res.json(results);
		})
		.catch(err => next(err));
});

module.exports = router;
