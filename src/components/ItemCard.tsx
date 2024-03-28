import { Item } from "../helper/types";

type ItemCardProps = Partial<Item> & {
  onAdd: () => void;
};

const ItemCard = ({
  image,
  title,
  price,
  description,
  onAdd
}: ItemCardProps) => {
  return (
    <li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>${price}</h4>
      <p>{description}</p>
      <button onClick={onAdd}>Add</button>
    </li>
  );
};

export default ItemCard;
