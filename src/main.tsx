import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CartContextProvider } from "./contexts/CartContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
