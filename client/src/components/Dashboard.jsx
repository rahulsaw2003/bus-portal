import React, { useContext } from "react";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
// import { validateUser } from "../services/api";
import { LoginContext } from "./Context/Context";
import "./mix.css";

const Dashboard = () => {
	const { loginData, setLoginData } = useContext(LoginContext);
	const history = useNavigate();
	console.log("Hey", loginData);

	const isAuthenticated = async () => {
		const token = localStorage.getItem("userToken");
		// console.log(token);
		// const resp = await validateUser(token);

		// if (!resp || resp.status !== 201) {
		// 	console.log("Error in Validation");
		// } else {
		// 	setLoginData(resp.data.user);
		// 	history("/dash");
		// }
	};

	useEffect(() => {
		isAuthenticated();
	}, []);

	return (
		<>
			<div className="centered-container">
				<div className="centered-content">
					<CgProfile size="8rem" />
					<div className="details">
						<h1>Hi, {loginData ? loginData.name : ""}</h1>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
