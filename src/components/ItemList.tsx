import { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import { getAllItems } from "../helper/APIHelper";
import { Item } from "../helper/types";
import ItemCard from "./ItemCard";

const ItemList = () => {
  const { addItemHandler } = useCartContext();
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
        {itemList.map((item) => (
          <ItemCard
            key={item.id}
            onAdd={() => addItemHandler(item)}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
