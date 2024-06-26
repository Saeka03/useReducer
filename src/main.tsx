import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartContextProvider } from "./contexts/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
