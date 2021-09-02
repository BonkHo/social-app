import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
// Styles
import "semantic-ui-css/semantic.min.css";
import "./App.css";
// SUI Components
import { Container } from "semantic-ui-react";
// Components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./components/MenuBar";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container>
					<Menu />
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/login" component={Login}></Route>
					<Route exact path="/register" component={Register}></Route>
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
