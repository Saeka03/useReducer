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
  deleteItemHandler: (deletedItem: Item) => void;
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
  | { type: "delete"; deletedItem: Item };

type ItemReducer = Reducer<Item[], ItemAction>;

const INITIAL_STATE: Item[] = [];

const cartItemReducer: ItemReducer = (prevState, action) => {
  switch (action.type) {
    case "add": {
      const existingItemIndex = prevState.findIndex(
        (item) => item.id === action.addedItem.id
      );
      if (existingItemIndex !== -1) {
        const newCartItemList = [...prevState];
        newCartItemList[existingItemIndex].quantity += 1;
        newCartItemList[existingItemIndex].totalPrice = parseFloat(
          (
            newCartItemList[existingItemIndex].totalPrice +
            action.addedItem.price
          ).toFixed(2)
        );
        return newCartItemList;
      } else {
        return [
          ...prevState,
          {
            ...action.addedItem,
            totalPrice: action.addedItem.price,
            quantity: 1,
          },
        ];
      }
    }

    case "delete": {
      if (action.deletedItem.quantity > 1) {
        const existingItemIndex = prevState.findIndex(
          (item) => item.id === action.deletedItem.id
        );
        if (existingItemIndex !== -1) {
          const newCartItemList = [...prevState];
          newCartItemList[existingItemIndex].quantity -= 1;
          newCartItemList[existingItemIndex].totalPrice = parseFloat(
            (
              newCartItemList[existingItemIndex].totalPrice -
              action.deletedItem.price
            ).toFixed(2)
          );
          return newCartItemList;
        }
      }
      return prevState.filter((item) => item.id !== action.deletedItem.id);
    }
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

  const deleteItemHandler = (deletedItem: Item) => {
    dispatch({ type: "delete", deletedItem });
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
