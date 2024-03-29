import { useEffect, useState } from "react";
import { getProducts } from "../helper/APIHelper";
import ItemCard from "./ItemCard";
import { Item } from "../helper/types";
import { useCartContext } from "../contexts/CartContext";

const ItemList = () => {
  const { addItemHandler } = useCartContext();
  const [itemList, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allItems = await getProducts();
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
        {itemList.map((item) => {
          return (
            <ItemCard
              key={item.id}
              onAdd={() => addItemHandler(item)}
              {...item}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
