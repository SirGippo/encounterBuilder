import { ReactNode, createContext, useContext, useState } from "react";
import { ProductCarts, ProductCart } from "../store";

interface CartContextType {
  cart: ProductCarts;
  addProduct: (product: ProductCart) => void;
  removeProduct: (product: ProductCart) => void;
  removeAllProducts: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ProductCarts>([]);

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

  const removeProduct = (product: ProductCart) => {
    setCart((cart) => {
      return cart.filter((productInCart) => productInCart.id !== product.id);
    });
    return;
  };

  const removeAllProducts = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, removeAllProducts }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("You called useCart() outside of a <CartContextProvider>");
  }
  return context;
}
