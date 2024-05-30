import { ReactNode, createContext, useContext, useState } from "react";
import { ProductCarts, ProductCart } from "../store";

// Type of the context
interface CartContextType {
  cart: ProductCarts;
  addProduct: (product: ProductCart) => void;
  removeProduct: (product: ProductCart) => void;
  removeAllProducts: () => void;
}

// Creating the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Wrapper that provides the context to all children
export function CartContextProvider({ children }: { children: ReactNode }) {
  // Storing the cart in a useState
  const [cart, setCart] = useState<ProductCarts>([]);

  // Adding a product to the cart or adding the count to the already existing product
  const addProduct = (product: ProductCart) => {
    setCart((cart) => {
      const idsOfProducts = cart.map((product) => product.id);
      const productExists = idsOfProducts.includes(product.id);
      if (!productExists) {
        return [...cart, product];
      } else {
        return cart.map((productInCart) =>
          productInCart.id === product.id
            ? { ...productInCart, count: productInCart.count + 1 }
            : productInCart
        );
      }
    });
    return;
  };

  // Removes a product from the cart
  const removeProduct = (product: ProductCart) => {
    setCart((cart) => {
      return cart.filter((productInCart) => productInCart.id !== product.id);
    });
    return;
  };

  // Removes all products from the cart by setting it to a new array
  const removeAllProducts = () => {
    setCart([]);
  };

  // The context provider that provides all the children with the cart and all related funtions
  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, removeAllProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook that allows children to access the context
export function useCart() {
  const context = useContext(CartContext);
  // Checking if the child calling useCart() is a child of <CartContextProvider>
  if (!context) {
    throw new Error("You called useCart() outside of a <CartContextProvider>");
  }
  return context;
}
