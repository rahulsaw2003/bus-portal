import mongoose from "mongoose";

const busSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter bus name"],
		trim: true,
	},
	seats: {
		type: Number,
		required: [true, "Please enter number of seats"],
	},
	occupancy: {
		type: Number,
		required: [true, "Please enter number of seats available"],
	},
	days: {
		type: String,
		required: [true, "Please enter days of operation"],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, ""],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Bus = mongoose.model("bus", busSchema);

export default Bus;
