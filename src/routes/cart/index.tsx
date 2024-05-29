import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "../../providers/CartProvider";

export const Route = createFileRoute("/cart/")({
  component: Cart,
});

function Cart() {
  const { cart, removeProduct, removeAllProducts } = useCart();
  return (
    <div>
      {cart.map((product) => (
        <div key={product.id}>
          {product.title} ----- {product.count}
        </div>
      ))}
    </div>
  );
}
