import { useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "./config/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  const cartRef = doc(db, "cart", process.env.REACT_APP_CART_DOCUMENT_ID);

  useEffect(() => {
    const syncCart = async () => {
      try {
        await updateDoc(cartRef, {
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        });

        const updatedCartDoc = await getDoc(cartRef);

        if (updatedCartDoc.exists()) {
          console.log("Cart synced successfully!");
        } else {
          console.error(
            "Failed to sync cart: Document not found after update."
          );
        }
      } catch (error) {
        // Handle the error here
        console.error("Failed to sync cart:", error);
      }
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
