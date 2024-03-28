import {
  ReactNode,
  useState,
  createContext,
  useEffect,
  useContext,
} from "react";

export type Cart = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type CartContextType = {
  items: Cart[];
};

type CartContextProviderProps = {
  children: ReactNode;
};

const INITIAL_CONTEXT = {
  items: [],
};

const CartItemContext = createContext<CartContextType>(INITIAL_CONTEXT);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItemList, setCartItem] = useState<Cart[]>([]);

  useEffect(() => {
    const getCartItems = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Cart[] = await response.json();
      setCartItem(data);
    };
    getCartItems();
  }, []);

  return (
    <CartItemContext.Provider value={{ items: cartItemList }}>
      {children}
    </CartItemContext.Provider>
  );
};

export const useCartContext = () => useContext(CartItemContext);
