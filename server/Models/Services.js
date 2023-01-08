const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
	price: { type: Number, required: true },
	description: { type: String, required: true },
	beauty: {
		brush: { type: Boolean, required: false },
		nailclips: { type: Boolean, required: false },
		washing: { type: Boolean, required: false },
	},
	veterinary: {
		examination: { type: Boolean, required: false },
		examinationSubject: { type: String, required: false },
		xRay: { type: Boolean, required: false },
	},
	hostel: { type: Boolean, required: false },
	walking: {
		location: { type: String, required: false },
		hours: { type: Number, required: false },
	},
});

module.exports = mongoose.model("services", serviceSchema);
