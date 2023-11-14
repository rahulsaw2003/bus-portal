import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
	},
	cpassword: {
		type: String,
		required: [true, "Please enter your cpassword"],
	},
	role: {
		type: String,
		default: "user",
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 12);
	this.cpassword = await bcrypt.hash(this.cpassword, 12);
	next();
});

userSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
			expiresIn: "15h",
		});
        this.tokens = this.tokens.concat({ token });
        
        await this.save();
        return token;
	} catch (error) {
        console.log(error.message);
        res.status(500).json({message: "Something went wrong while generating token", error})
    }
};

const User = mongoose.model("User", userSchema);

export default User;
