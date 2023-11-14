import axios from 'axios'


const serverURL = "http://localhost:5000";

export const userLogin = async (user) => {
	try {
		const response = axios.post(`${serverURL}/api/login`, user);
		console.log("User Login Successfully", user);
		return response;
	} catch (error) {
		console.log("Error in userLogin API: ", error);
		// throw error;
	}
};

export const userRegister = async (user) => {
	try {
		const response = await axios.post(`${serverURL}/api/register`, user);
		console.log("User Registered Successfully", user);
		return response;
	} catch (error) {
		console.log("Error in userRegister API: ", error);
		// throw error;
	}
};