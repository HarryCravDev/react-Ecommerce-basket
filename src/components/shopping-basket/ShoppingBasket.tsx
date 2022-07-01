import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingBasketContext } from "../../context/ShoppingBasketContext";
import { formatCurrency } from "../../utils/formatCurrency";
import BasketItem from "../basket-item/BasketItem";
import ShoppingItems from "../../data/Items.json";

const ShoppingBasket = ({ isOpen }: { isOpen: boolean }) => {
	const { closeBasket, basketItems } = useShoppingBasketContext();

	console.log({ basketItems });
	return (
		<Offcanvas show={isOpen} onHide={closeBasket} placement="end">
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Basket</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{basketItems.map((item) => (
						<BasketItem key={item.id} {...item} />
					))}
					<div className="ms-auto fw-bold fs-5">
						Total{" "}
						{formatCurrency(
							basketItems.reduce((total, basketItem) => {
								const item: any = ShoppingItems.find(
									(item) => item.id === basketItem.id
								);

								console.log({ item });

								return total + (item?.price || 0) * basketItem.quantity;
							}, 0)
						)}
					</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingBasket;
