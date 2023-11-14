import React, { useState } from "react";
import "./mix.css";
import { userLogin, userRegister } from "../services/api";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultUser = {
	name: "",
	email: "",
	password: "",
	cpassword: "",
    role: "user"
};

const Register = () => {
	const [userData, setUserData] = useState(defaultUser);
	const [passShow, setPassShow] = useState(false);
	const [cpassShow, setcPassShow] = useState(false);
	const navigate = useNavigate();

	const handleValueChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
		// console.log(userData);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		const { name, email, password, cpassword } = userData;

		if (!name || !email || !password || !cpassword) {
			toast.warn("Please fill all the fields");
		}
		if (!email.includes("@")) {
			toast.warn("Please enter a valid email");
		}

		if (password !== cpassword) {
			toast.warn("Password does not match");
		}

		if (password.length < 5) {
			toast.warn("Password must be atleast 5 characters long");
		}

		const res = await userRegister(userData);

		if (res.status === 201) {
			toast.success("User Registered Successfully");
			const loginData = {
				email: userData.email,
				password: userData.password,
			};
			const { data } = await userLogin(loginData);

			if (data?.token) {
				localStorage.setItem("userToken", data.token);
				navigate("/dash");
			} else {
				toast.error("Something went wrong, please try again later");
			}
			setUserData(defaultUser);
		}
	};

	return (
		<section>
			<div className="form_data">
				<div className="form_heading">
					<h1>Register Now</h1>
				</div>

				<form method="post">
					<div className="form_input">
						<label htmlFor="name">Name</label>
						<input type="name" name="name" id="name" placeholder="Enter your full name" onChange={(e) => handleValueChange(e)} value={userData.name} />
					</div>
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
					<div className="form_input">
						<label htmlFor="cpassword">Confirm Password</label>
						<div className="two">
							<input type={!cpassShow ? "password" : "text"} name="cpassword" id="cpassword" placeholder="Re-enter your Password" onChange={(e) => handleValueChange(e)} value={userData.cpassword} />
							<div className="showpass" onClick={() => setcPassShow(!cpassShow)}>
								{!cpassShow ? "Show" : "Hide"}
							</div>
						</div>
					</div>
					<button className="btn" onClick={(e) => handleClick(e)}>
						Sign Up
					</button>
					<p>
						Already have an account! <NavLink to={"/"}>Login</NavLink>
					</p>
				</form>
			</div>
		</section>
	);
};

export default Register;
