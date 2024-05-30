import { TrashIcon } from "@heroicons/react/16/solid";
import { useCart } from "../providers/CartProvider";
import { ProductCarts } from "../store";

// What the CartsTable is expecting
interface CartsTableProps {
  products: ProductCarts;
}

export function CartsTable({ products }: CartsTableProps) {
  // Accessing the Cart context to remove products from our cart
  const { removeProduct } = useCart();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              price
            </th>
            <th scope="col" className="px-6 py-3">
              count
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {product.title}
              </th>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.count}</td>
              <td className="px-6 py-4">
                {/* Button to remove the specific product from our cart */}
                <button onClick={() => removeProduct(product)}>
                  <TrashIcon width={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
