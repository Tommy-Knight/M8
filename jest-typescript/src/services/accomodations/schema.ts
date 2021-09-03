import { AccomodationType } from "../../types/index";
import User from "../users/schema.js";
import createError from "http-errors";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AccomodationSchema = new Schema<AccomodationType>(
	{
		name: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		maxGuests: { type: Number, default: 1, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

AccomodationSchema.pre("save", async function (done) {
	try {
		const isExist = await User.findById(this.user);
		if (isExist) {
			done();
		} else {
			const error = new Error("this author does not exist");
			done(createError(400, error));
		}
	} catch (error) {
		done(error);
	}
});

export default model("Accomodation", AccomodationSchema);
