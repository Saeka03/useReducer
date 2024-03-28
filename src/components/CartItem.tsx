import { Item } from "../helper/types";

const CartItem = ({ title, image, quantity, totalPrice }: Item) => {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>Quantity: {quantity}</h4>
      <h4>Total Price: ${totalPrice}</h4>
      <button>Delete</button>
    </li>
  );
};

export default CartItem;
