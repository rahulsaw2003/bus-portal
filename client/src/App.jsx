import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/register" element={<Register />} />
				{/* <Route path="/dash" element={<Dashboard />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
