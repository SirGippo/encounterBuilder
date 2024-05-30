import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../../providers/CartProvider";
import { CartsTable } from "../../components/CartsTable";

// What gets rendered at localhost:5173/cart
export const Route = createFileRoute("/cart/")({
  component: Cart,
});

function Cart() {
  // Accessing the CartContext to retieve all products and checkout
  // INFO: Checkout is simulated by just removing all products from the cart
  const { cart, removeAllProducts } = useCart();

  // Get the value of all the products in the cart
  const allPrice = cart.reduce((accumulator, currentProduct) => {
    return accumulator + currentProduct.price * currentProduct.count;
  }, 0);

  return (
    <div>
      <CartsTable products={cart} />
      <button onClick={() => removeAllProducts()}>Checkout</button>
      <div>{allPrice}</div>
    </div>
  );
}
