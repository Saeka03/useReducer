import {
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer
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
  deleteItemHandler: () => {}
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

// is just function, does not have to be in the react component
const cartItemReducer: ItemReducer = (prevState, action) => {
  switch (action.type) {
    case "add": {
      // moving logic to state from
      const existingItemIndex = prevState.findIndex(
        (item) => item.id === action.addedItem.id
      );

      if (existingItemIndex !== -1) {
        // if the item is already existing
        // then you need to update the existing instead
        const newCartItemList = [...prevState];
        newCartItemList[existingItemIndex].quantity += 1;
        newCartItemList[existingItemIndex].totalPrice += action.addedItem.price;

        return newCartItemList;
      } else {
        // otherwise just append new one
        return [
          ...prevState,
          {
            ...action.addedItem,
            totalPrice: action.addedItem.price,
            quantity: 1
          }
        ];
      }
    }
    case "delete":
      return prevState.filter((item) => item.id !== action.itemId);
    default:
      throw new Error("invalid type");
  }
};

export const CartContextProvider = ({ children }: childrenProps) => {
  const [cartItemList2, dispatch] = useReducer<ItemReducer>(
    cartItemReducer,
    INITIAL_STATE
  );

  const addItemHandler = (addedItem: Item) => {
    dispatch({ type: "add", addedItem });
  };

  // delete event should the same as add event
  // I will let you try
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
