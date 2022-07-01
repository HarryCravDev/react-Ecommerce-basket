import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingBasketContext } from "../../context/ShoppingBasketContext";
import { formatCurrency } from "../../utils/formatCurrency";
interface IStoreItem {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
}

const StoreItem: React.FC<IStoreItem> = ({ id, name, price, imgUrl }) => {
	const {
		getItemQuantity,
		increaseBasketQuantity,
		decreaseBasketQuantity,
		removeFromBasket,
	} = useShoppingBasketContext();
	const quantity = getItemQuantity(id);

	return (
		<Card className="h-100">
			<Card.Img
				variant="top"
				src={imgUrl}
				height="250px"
				style={{ objectFit: "cover" }}
			/>
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="ms-2 text-muted">{formatCurrency(price)}</span>
				</Card.Title>
				{quantity <= 0 ? (
					<Button onClick={() => increaseBasketQuantity(id)} variant="primary">
						Add to cart
					</Button>
				) : (
					<div
						className="d-flex align-items-center flex-column"
						style={{ gap: ".5rem" }}
					>
						<div
							className="d-flex align-items-center justify-content-center"
							style={{ gap: ".5rem" }}
						>
							<Button onClick={() => increaseBasketQuantity(id)} variant="dark">
								+
							</Button>
							<div>
								<span className="fs-3">{quantity}</span> in cart
							</div>
							<Button variant="dark" onClick={() => decreaseBasketQuantity(id)}>
								-
							</Button>
						</div>
						<Button
							variant="danger"
							size="sm"
							onClick={() => removeFromBasket(id)}
						>
							Remove
						</Button>
					</div>
				)}
			</Card.Body>
		</Card>
	);
};

export default StoreItem;
