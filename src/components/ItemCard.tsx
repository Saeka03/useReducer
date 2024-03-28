import { Item } from "../helper/types";

const ItemCard = ({ id, title, price, description, image }: Item) => {
  return (
    <li key={id}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>{price}</h4>
      <p>{description}</p>
      <button>Add</button>
    </li>
  );
};

export default ItemCard;
