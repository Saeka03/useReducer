import { useCartContext } from "../contexts/CartContext";
import { Item } from "../helper/types";
import CartItem from "./CartItem";

const CartItemList = () => {
  const { items, deleteItemHandler } = useCartContext();

  return (
    <div className="cart-items">
      <h1>My Cart</h1>
      <ul>
        {items.map((item: Item) => {
          return (
            <CartItem
              key={item.id}
              onDelete={() => deleteItemHandler(item)}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CartItemList;
