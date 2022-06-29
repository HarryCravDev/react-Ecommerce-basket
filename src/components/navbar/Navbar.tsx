import * as React from "react";
import {
	Navbar as NavbarContainer,
	Container,
	Nav,
	Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	const navItems = ["Home", "About", "Store"];

	return (
		<NavbarContainer className="p-4" bg="dark" variant="dark">
			<Container>
				<Nav className="me-auto">
					{navItems.map((item: string) => (
						<Nav.Link to={item === "Home" ? "/" : `${item}`} as={NavLink}>
							{item}
						</Nav.Link>
					))}
				</Nav>
				<Button>Submit</Button>
			</Container>
		</NavbarContainer>
	);
};

export default Navbar;
