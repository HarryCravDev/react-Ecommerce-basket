import React from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingBasketContext } from "../../context/ShoppingBasketContext";
import ShoppingItems from "../../data/Items.json";
import { formatCurrency } from "../../utils/formatCurrency";

interface IBasketItem {
	id: number;
	quantity: number;
}

const BasketItem: React.FC<IBasketItem> = ({ id, quantity }) => {
	const { removeFromBasket } = useShoppingBasketContext();
	const item = ShoppingItems.find((item) => item.id === id);

	if (!item) return null;

	return (
		<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
			<img
				src={item.imgUrl}
				alt={item.name}
				style={{ width: "125px", height: "75px", objectFit: "cover" }}
			/>
			<div className="me-auto">
				<div>
					{item.name}{" "}
					<span className="text-muted" style={{ fontSize: "1rem" }}>
						{quantity}x
					</span>
				</div>
				<div className="text-muted" style={{ fontSize: "1rem" }}>
					{formatCurrency(item.price)}
				</div>
			</div>
			<div>{formatCurrency(item.price * quantity)}</div>
			<Button
				variant="outline-danger"
				size="sm"
				onClick={() => removeFromBasket(item.id)}
			>
				&times;
			</Button>
		</Stack>
	);
};

export default BasketItem;
