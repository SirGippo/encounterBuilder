import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../../providers/CartProvider";
import { CartsTable } from "../../components/CartsTable";
import "./index.css";

// What gets rendered at localhost:5173/cart
export const Route = createFileRoute("/cart/")({
  component: Cart,
});

function Cart() {
  // Accessing the CartContext to retieve all products and checkout
  // INFO: Checkout is simulated by just removing all products from the cart
  const { cart, removeAllProducts } = useCart();

  // Get the value of all the products in the cart
  const allPrice = cart
    .reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price * currentProduct.count;
    }, 0)
    .toFixed(2);

  return (
    <div className="bg-slate-500 cart">
      <CartsTable products={cart} p-0 />
      <div className="flex flex-row justify-end py-5 ">
        <div className="py-2 px-10 underline">{allPrice}</div>
        <button
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
          onClick={() => removeAllProducts()}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
