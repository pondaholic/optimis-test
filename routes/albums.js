const express = require('express');
const router = express.Router();

const Album = require('../models/albums');

router.get('/', (req, res, next) => {
	// console.info(req.query);
	const { album } = req.query;
	const albumName = { album };
	// console.info(albumName.album);

	Album.find({ name: albumName.album })
		.then(results => {
			res.json(results);
		})
		.catch(err => next(err));
});

module.exports = router;
