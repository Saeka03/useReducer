import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Item } from "../helper/types";

type CartContextType = {
  items: Item[];
  addItemHandler: (addedItem: Item) => void;
  deleteItemHandler: (itemId: number, quantity: number, price: number) => void;
};

const INITIAL_CONTEXT: CartContextType = {
  items: [],
  addItemHandler: () => {},
  deleteItemHandler: () => {},
};

export const CartItemContext = createContext<CartContextType>(INITIAL_CONTEXT);

type childrenProps = {
  children: ReactNode;
};

type ItemAction =
  | {
      type: "add";
      addedItem: Item;
    }
  | { type: "delete"; itemId: number; quantity: number; price: number };

type ItemReducer = Reducer<Item[], ItemAction>;

const INITIAL_STATE: Item[] = [];

export const CartContextProvider = ({ children }: childrenProps) => {
  const cartItemReducer: ItemReducer = (prevState, action) => {
    switch (action.type) {
      case "add":
        return [...prevState, action.addedItem];

      case "delete":
        return prevState.filter((item) => item.id !== action.itemId);
      default:
        break;
    }
    return prevState;
  };

  const [cartItemList2, dispatch] = useReducer<ItemReducer>(
    cartItemReducer,
    INITIAL_STATE
  );

  const addItemHandler = (addedItem: Item) => {
    const existingItemIndex = cartItemList2.findIndex(
      (item) => item.id === addedItem.id
    );
    if (existingItemIndex !== -1) {
      const newCartItemList = [...cartItemList2];
      newCartItemList[existingItemIndex].quantity += 1;
      newCartItemList[existingItemIndex].totalPrice += addedItem.price;
    } else {
      dispatch({ type: "add", addedItem });
    }
  };

  const deleteItemHandler = (
    itemId: number,
    price: number,
    quantity: number
  ) => {
    if (quantity > 1) {
      const existingItemIndex = cartItemList2.findIndex(
        (item) => item.id === itemId
      );
      if (existingItemIndex !== -1) {
        const newCartItemList = [...cartItemList2];
        newCartItemList[existingItemIndex].quantity -= 1;
        newCartItemList[existingItemIndex].totalPrice -= price;
      }
    } else {
      dispatch({ type: "delete", itemId, quantity, price });
    }
  };

  return (
    <CartItemContext.Provider
      value={{ items: cartItemList2, addItemHandler, deleteItemHandler }}
    >
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartContext = () => useContext(CartItemContext);
