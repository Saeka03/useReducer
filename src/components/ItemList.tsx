import { Cart, useCartContext } from "../contexts/CartContext";

export const ItemList = () => {
  const { items: cartItemList } = useCartContext();

  return (
    <div className="item-list">
      <ul>
        {cartItemList.map(({ id, title, price, description, image }: Cart) => (
          <li key={id}>
            <img src={image} alt={title} />
            <p>{title}</p>
            <p>${price}</p>
            <p>{description}</p>
            <button>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
