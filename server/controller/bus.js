import Bus from "../mongoDB/busModel.js";

export const getBuses = async (req, res) => {
	try {
		
		const buses = await Bus.find();
		res.status(201).json({ message: "Bus deleted successfully", buses });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: "Something went wrong while deleting bus", error });
	}
};
