import { useEffect, useState } from "react";
import { getAllItems } from "../helper/APIHelper";
import ItemCard from "./ItemCard";
import { Item } from "../helper/types";

const ItemList = () => {
  const [itemList, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allItems = await getAllItems();
      if (!allItems) {
        throw new Error("Failed to get the items");
      }
      setItems(allItems);
    };
    getData();
  }, []);

  return (
    <div className="item-section">
      <h1>Item List</h1>
      <ul>
        {itemList.map((item: Item) => {
          return (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
