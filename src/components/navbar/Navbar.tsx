import * as React from "react";
import {
	Navbar as NavbarContainer,
	Container,
	Nav,
	Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingBasketContext } from "../../context/ShoppingBasketContext";

const Navbar = () => {
	const { basketQuantity, openBasket } = useShoppingBasketContext();
	const navItems = ["Home", "About", "Store"];

	return (
		<NavbarContainer sticky="top" className="p-4" bg="dark" variant="dark">
			<Container>
				<Nav className="me-auto">
					{navItems.map((item: string) => (
						<Nav.Link
							key={item}
							to={item === "Home" ? "/" : `${item}`}
							as={NavLink}
						>
							{item}
						</Nav.Link>
					))}
				</Nav>
				{basketQuantity > 0 && (
					<Button
						style={{ height: "4rem", width: "4rem", position: "relative" }}
						className="rounded-circle"
						variant="outline-light"
						onClick={openBasket}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							fill="currentColor"
							className="bi bi-cart"
							viewBox="0 0 16 16"
						>
							<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
						</svg>
						<div
							className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
							style={{
								color: "white",
								height: "1.5rem",
								width: "1.5rem",
								position: "absolute",
								bottom: 0,
								right: 0,
								transform: "translate(20%, 25%)",
							}}
						>
							{basketQuantity}
						</div>
					</Button>
				)}
			</Container>
		</NavbarContainer>
	);
};

export default Navbar;
