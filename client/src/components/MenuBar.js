import React, { useState } from "react";
import { Link } from "react-router-dom";
// SUI Components
import { Menu } from "semantic-ui-react";

// This component was obtained from Semantic UI and is used as the NavBar for every single page
// Semantic UI is similar to Material UI and Bootstrap
// Some components in Semantic UI are class components and should be converted into functional components before use
// Functional components use hooks instead of state variables, dont require render functions, and dont use the reference 'this'

const MenuBar = () => {
	// Logic to figure out the active path
	const pathName = window.location.pathname;
	console.log(pathName);
	const path = pathName === "/" ? "home" : pathName.substr(1);

	// Sets state to the active path
	const [activeItem, setActiveItem] = useState(path);

	// Listens for onClick event to setActiveItem
	const handleItemClick = (e, { name }) => setActiveItem(name);

	return (
		<Menu pointing secondary size="massive" color="teal">
			<Menu.Item
				name="home"
				active={activeItem === "home"}
				onClick={handleItemClick}
				as={Link}
				to="/"
			/>
			<Menu.Menu position="right">
				<Menu.Item
					name="login"
					active={activeItem === "login"}
					onClick={handleItemClick}
					as={Link}
					to="/login"
				/>
				<Menu.Item
					name="register"
					active={activeItem === "register"}
					onClick={handleItemClick}
					as={Link}
					to="/register"
				/>
			</Menu.Menu>
		</Menu>
	);
};

export default MenuBar;
