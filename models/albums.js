const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	year: { type: Number },
	artist: { type: String }
});

albumSchema.set('autoIndex', false);
albumSchema.set('toObject', {
	virtuals: true,
	versionKey: false,
	transform: (doc, ret) => {
		delete ret._id;
	}
});

module.exports = mongoose.model('Album', albumSchema);
