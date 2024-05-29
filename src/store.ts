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

export type Products = Product[]

export type ProductCart = {
  id: number;
  title: string;
  price: number;
  count: number;
}

export type ProductCarts = ProductCart[];