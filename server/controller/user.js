import bcrypt from "bcrypt";
import Bus from "../mongoDB/busModel.js";
import User from "../mongoDB/userModel.js";

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const isUser = await User.findOne({ email: email });
		if (!isUser) {
			res.status(404).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, isUser.password);

		if (!isMatch) {
			res.status(400).json({ message: "Invalid credentials" });
		}

		const token = await isUser.generateAuthToken();
		res.cookie("jwtToken", token, {
			httpOnly: true,
			expires: new Date(Date.now() + 15 * 60 * 1000),
		});
		res.status(200).json({ message: "User logged in successfully", token });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong while login", error });
	}
};

export const register = async (req, res) => {
	const { name, email, password, cpassword, role } = req.body;
	try {
		if (!name || !email || !password || !cpassword) {
			res.status(400).json({ message: "Please fill all the fields" });
		}

		const isUser = await User.findOne({ email: email });
		if (isUser) {
			res.status(404).json({ message: "User already registered" });
		}

		if (password !== cpassword) {
			res.status(400).json({ message: "Password and confirm password should be same" });
		}

		const newUser = await User.create({ name, email, password, cpassword, role });
		res.status(201).json({ message: "User registered successfully", newUser });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong while login", error });
	}
};

export const addBus = async (req, res) => {
	const { name, seats, occupancy, days } = req.body;
	const id = req.userID;
	try {
		if (!name || !seats || !occupancy || !days) {
			res.status(400).json({ message: "Please fill all the fields" });
		}
		const newBus = await Bus.create({ name, seats, occupancy, days, user: id });
		res.status(201).json({ message: "Bus added successfully", newBus });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong while adding bus", error });
	}
};

export const updateBus = async (req, res) => {
	const newBus = req.body;
	const { name, seats, occupancy, days } = req.body;
	try {
		if (!name || !seats || !occupancy || !days) {
			res.status(400).json({ message: "Please fill all the fields" });
		}
		await Bus.updateOne({ _id: req.params.id }, newBus);
		const updatedBus = await Bus.findById(req.params.id);
		console.log(updateBus);
		res.status(201).json({ message: "Bus updated successfully", updatedBus });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong while updating bus", error });
	}
};
export const deleteBus = async (req, res) => {
	try {
		await Bus.deleteOne({ _id: req.params.id });

		res.status(201).json({ message: "Bus deleted successfully" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong while deleting bus", error });
	}
};

export const userLogout = async (req, res) => {
	try {
		req.rootUser.tokens = req.rootUser.tokens.filter((currToken) => {
			return currToken.token !== req.token;
		});
		res.clearCookie("jwtToken", { path: "/" });
		req.rootUser.save();

		res.status(201).json({ message: "Logged out successfully", status: 201 });
	} catch (error) {
		res.status(500).json({ status: 500, message: error.message });
	}
};
