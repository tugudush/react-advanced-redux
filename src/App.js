import { useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "./config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  const cartRef = doc(db, "cart", "2dm9qslTI4zkKlU4fL80");

  useEffect(() => {
    const syncCart = async () => {
      await updateDoc(cartRef, {
        items: cart.items,
        totalQuantity: cart.totalQuantity,
      });
    };
    syncCart();
  }, [cart, cartRef]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
