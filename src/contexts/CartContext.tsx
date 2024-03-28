import { ReactNode, createContext, useContext, useState } from "react";
import { Item } from "../helper/types";

type CartContextType = {
  items: Item[];
  addItemHandler: (addedItem: Item) => void;
};

const INITIAL_CONTEXT: CartContextType = {
  items: [],
  addItemHandler: () => {},
};

export const CartItemContext = createContext<CartContextType>(INITIAL_CONTEXT);

type childrenProps = {
  children: ReactNode;
};

export const CartContextProvider = ({ children }: childrenProps) => {
  const [cartItemList, setCartItem] = useState<Item[]>([]);
  const addItemHandler = (addedItem: Item) => {
    const existingItemIndex = cartItemList.findIndex(
      (item) => item.id === addedItem.id
    );
    if (existingItemIndex !== -1) {
      const newCartItemList = [...cartItemList];
      newCartItemList[existingItemIndex].quantity += 1;
      newCartItemList[existingItemIndex].totalPrice += addedItem.price;
    } else {
      setCartItem((prevState) => [...prevState, addedItem]);
    }
  };

  return (
    <CartItemContext.Provider value={{ items: cartItemList, addItemHandler }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartContext = () => useContext(CartItemContext);
