import React, { useState } from "react";
import { userLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./mix.css";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const defaultUser = {
	email: "",
	password: "",
};


const LoginPage = () => {
	const [passShow, setPassShow] = useState(false);
	const [userData, setUserData] = useState(defaultUser);
	const navigate = useNavigate();
	const handleValueChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const { email, password } = userData;
		if (!email || !password) {
			toast.warn("Please fill all the fields");
		}
		if (!email.includes("@")) {
			toast.warn("Please enter a valid email");
		}

		const { data } = await userLogin(userData);

		if (data?.token) {
			localStorage.setItem("userToken", data.token);
			toast.success("User Logged In Successfully");
			navigate("/dash");
		} else {
			toast.error("Invalid Credentials");
		}
	};

	return (
		<section>
			<div className="form_data">
				<div className="form_heading">
					<h1>Bus Management Portal</h1>
				</div>

				<form action="">
					<div className="form_input">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" placeholder="Enter your email address" onChange={(e) => handleValueChange(e)} value={userData.email} />
					</div>
					<div className="form_input">
						<label htmlFor="password">Password</label>
						<div className="two">
							<input type={!passShow ? "password" : "text"} name="password" id="password" placeholder="Enter your password" onChange={(e) => handleValueChange(e)} value={userData.password} />
							<div className="showpass" onClick={() => setPassShow(!passShow)}>
								{!passShow ? "Show" : "Hide"}
							</div>
						</div>
					</div>
					<button className="btn" onClick={(e) => handleClick(e)}>
						Login
					</button>
					<p>
						Don't have an account? <NavLink to={"/register"}>Register</NavLink>
					</p>
				</form>
			</div>
		</section>
	);
};

export default LoginPage;
