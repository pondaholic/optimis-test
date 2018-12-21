const express = require('express');
const router = express.Router();

const Song = require('../models/songs');

router.get('/', (req, res, next) => {
	const { song } = req.query;
	const songName = { song };

	Song.find({ song: songName.song })
		.then(results => {
			res.json(results);
		})
		.catch(err => next(err));
});

module.exports = router;
