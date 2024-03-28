import { useCartContext } from "../contexts/CartContext";
import { Item } from "../helper/types";

const CartItem = ({ id, title, image, price, quantity, totalPrice }: Item) => {
  const { deleteItemHandler } = useCartContext();
  const deleteHandler = () => {
    deleteItemHandler(id, price, quantity);
  };
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>Quantity: {quantity}</h4>
      <h4>Total Price: ${totalPrice}</h4>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default CartItem;
