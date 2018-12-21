const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
	song: { type: String, required: true, unique: true },
	lyrics: { type: String },
	album: { type: String, ref: 'Album', required: true }
});

songsSchema.set('autoIndex', false);
songsSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
	}
});

module.exports = mongoose.model('Song', songsSchema);
