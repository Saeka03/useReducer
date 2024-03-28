// import { Cart, useCartContext } from "../contexts/CartContext";
// import React, { Reducer, useReducer } from "react";

// type ItemType = {
//   id: number;
//   title: string;
// };

// type ItemAction = {
//   type: "add";
//   title: ItemType["title"];
// };

// type CartItemReducer = Reducer<ItemType[], ItemAction>;

// const INITIAL_STATE: ItemType[] = [];

// const itemReducer: CartItemReducer = (prevState, action) => {
//   switch (action.type) {
//     case "add":
//       return [
//         ...prevState,
//         {
//           id: prevState.length,
//           title: action.title,
//         },
//       ];
//     default:
//       break;
//   }
//   return prevState;
// };

// export const ItemList = () => {
//   const { items: cartItemList } = useCartContext();
//   const [cartItems, dispatch] = useReducer<CartItemReducer>(
//     itemReducer,
//     INITIAL_STATE
//   );

//   const addButtonHandler = () => {
//     dispatch({ type: "add", title });
//   };

//   return (
//     <div className="item-list">
//       <ul>
//         {cartItemList.map(({ id, title, price, description, image }: Cart) => (
//           <li key={id}>
//             <img src={image} alt={title} />
//             <p>{title}</p>
//             <p>${price}</p>
//             <p>{description}</p>
//             <button onClick={addButtonHandler}>Add</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import { getAllItems } from "../helper/APIHelper";
import ItemCard from "./ItemCard";
import { Item } from "../helper/types";

// type ItemListProps = {
//   itemList: Item[];
// };

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
      <ul>
        {itemList.map((item: Item) => {
          return (
            <ItemCard
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;
