import React from "react";
import { Col, Row } from "react-bootstrap";
import StoreItem from "../components/store-item/StoreItem";
import Products from "../data/Items.json";

const Store = () => {
	return (
		<>
			<div>Store</div>
			<Row xs={1} md={2} lg={3}>
				{Products.map((product) => (
					<Col key={product.id} className="mb-3">
						<StoreItem {...product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default Store;
