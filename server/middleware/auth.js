import jwt from "jsonwebtoken";
import User from "../mongoDB/userModel.js";

export const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
		const admin = await User.findOne({ _id: verifyToken._id, "tokens.token": token, role: "admin" });
		if (!admin) {
			throw new Error("You are not authorized to add Bus Details");
		}
		req.token = token;
		req.admin = admin;
		req.userID = admin._id;
		next();
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong while verifying admin", error });
	}
};

export const isUser = async (req, res, next) => {
	try {
		let token = req.headers.authorization;
		const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
		const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
		if (!rootUser) {
			throw new Error("User not found");
		}
		req.usertoken = token;
		req.rootUser = rootUser;
		req.rootUserId = rootUser._id;
		next();
	} catch (error) {
		res.status(500).json({ message: "Unauthorized: No token provided" });
		console.log(error);
	}
}
