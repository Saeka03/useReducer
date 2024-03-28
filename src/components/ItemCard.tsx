import { useCartContext } from "../contexts/CartContext";
import { Item } from "../helper/types";

const ItemCard = ({ id, title, price, description, image }: Item) => {
  const { addItemHandler } = useCartContext();

  const addHandler = () => {
    addItemHandler({
      id: id,
      title: title,
      price: price,
      description: description,
      image: image,
      quantity: 1,
      totalPrice: price,
    });
  };

  return (
    <li key={id}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>${price}</h4>
      <p>{description}</p>
      <button onClick={addHandler}>Add</button>
    </li>
  );
};

export default ItemCard;
