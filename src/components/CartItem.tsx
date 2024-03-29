import { Item } from "../helper/types";

type CartItemProps = Partial<Item> & {
  onDelete: () => void;
};

const CartItem = ({
  title,
  image,
  quantity,
  totalPrice,
  onDelete,
}: CartItemProps) => {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>Quantity: {quantity}</h4>
      <h4>Total Price: ${totalPrice}</h4>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default CartItem;
