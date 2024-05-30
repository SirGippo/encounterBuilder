// Product type expected from the API
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

// List of Products from the API
export type Products = Product[]


// Product in the Cart
export type ProductCart = {
  id: number;
  title: string;
  price: number;
  count: number;
}

// List of Products in the Cart
export type ProductCarts = ProductCart[];