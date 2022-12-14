import { Product } from './types';

type GetProductsApiResponse = {
  data: Product[];
};

export async function fetchProducts(): Promise<GetProductsApiResponse> {
  const result = await fetch(`${process.env.API_URL}/api/products`);
  return await result.json();
}

type CreateProductApiResponse = {
  Id: string;
};

export async function createProduct(
  product: Partial<Product>
): Promise<CreateProductApiResponse> {
  const result = await fetch(`${process.env.API_URL}/api/products/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  return await result.json();
}
