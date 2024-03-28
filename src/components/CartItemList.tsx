import { useCartContext } from "../contexts/CartContext";
import { Item } from "../helper/types";
import CartItem from "./CartItem";

const CartItemList = () => {
  const { items } = useCartContext();

  return (
    <div className="cart-items">
      <h1>My Cart</h1>
      <ul>
        {items.map((item: Item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CartItemList;
