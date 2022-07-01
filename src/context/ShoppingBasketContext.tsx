import { useContext, createContext, ReactNode, useState } from "react";
import ShoppingBasket from "../components/shopping-basket/ShoppingBasket";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface IShoppingBasketProviderProps {
	children: ReactNode;
}

interface IShoppingBasketContext {
	openBasket: () => void;
	closeBasket: () => void;
	getItemQuantity: (id: number) => number;
	increaseBasketQuantity: (id: number) => void;
	decreaseBasketQuantity: (id: number) => void;
	removeFromBasket: (id: number) => void;
	basketQuantity: number;
	basketItems: IBasketItem[];
	isOpen: boolean;
}

interface IBasketItem {
	id: number;
	quantity: number;
}

const ShoppingBasketContext = createContext({} as IShoppingBasketContext);

export function useShoppingBasketContext() {
	return useContext(ShoppingBasketContext);
}

export function ShoppingBasketProvider({
	children,
}: IShoppingBasketProviderProps) {
	const [basketItems, setBasketItems] = useLocalStorage<IBasketItem[]>(
		"basket-items",
		[]
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const basketQuantity = basketItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	function getItemQuantity(id: number) {
		return basketItems.find((item) => item.id === id)?.quantity || 0;
	}

	function increaseBasketQuantity(id: number) {
		setBasketItems((currentItems) => {
			if (currentItems.find((item) => item.id === id) == null) {
				return [...currentItems, { id, quantity: 1 }];
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function decreaseBasketQuantity(id: number) {
		setBasketItems((currentItems) => {
			if (currentItems.find((item) => item.id === id)?.quantity === 1) {
				return currentItems.filter((item) => item.id !== id);
			} else {
				return currentItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function removeFromBasket(id: number) {
		setBasketItems((currentItems) => {
			return currentItems.filter((item) => item.id !== id);
		});
	}

	const openBasket = () => setIsOpen(true);

	const closeBasket = () => setIsOpen(false);

	return (
		<ShoppingBasketContext.Provider
			value={{
				getItemQuantity,
				increaseBasketQuantity,
				decreaseBasketQuantity,
				removeFromBasket,
				basketItems,
				basketQuantity,
				openBasket,
				closeBasket,
				isOpen,
			}}
		>
			{children}
			<ShoppingBasket isOpen={isOpen} />
		</ShoppingBasketContext.Provider>
	);
}
