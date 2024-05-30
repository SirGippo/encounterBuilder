import { StarIcon } from "@heroicons/react/16/solid";
import { useCart } from "../providers/CartProvider";
import { Product } from "../store";

// What the card is expecting as props
interface CardProps {
  product: Product;
}

export function Card({ product }: CardProps) {
  // Destructing product
  const { image, id, price, description, rating, title } = product;

  // Accessing the Cart Context to add products to our cart
  const { addProduct } = useCart();

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow h-fit">
      <div className="flex justify-center">
        <img
          className="p-8 rounded-t-lg h-80"
          src={image}
          alt="product image"
        />
      </div>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex flex-row">
            <div className="w-6"></div>
          </div>
          <div className="flex gap-1">
            {rating.rate}
            <StarIcon width="15px" />
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
            {rating.count}
          </span>
        </div>
        <div className="text-md pb-1">{description}</div>
        <hr />
        <div className="flex items-center justify-between pt-2">
          <span className="text-3xl font-bold">{price} $</span>

          {/* Button that adds the product to our cart */}
          <button
            onClick={() => addProduct({ id, title, price, count: 1 })}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
