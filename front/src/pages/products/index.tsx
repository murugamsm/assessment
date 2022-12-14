import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';

import { fetchProducts } from '@/lib/api';
import { Product } from '@/lib/types';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';

import Vercel from '~/svg/Vercel.svg';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadData = useCallback(async () => {
    const { data } = await fetchProducts();
    setProducts(data);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Layout>
      <Head>
        <title>Create Product</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4 mb-8'>Products</h1>

            <div className='mb-8'>
              <ButtonLink variant='primary' href='/products/create'>
                Create New Product
              </ButtonLink>
            </div>

            <table className='w-full lg:w-[800px]'>
              <thead>
                <tr className='border-b-2'>
                  <th className='py-2 text-left'>ID</th>
                  <th className='py-2 text-left'>Name</th>
                  <th className='py-2 text-left'>Quantity</th>
                  <th className='py-2 text-left'>Rate</th>
                  <th className='py-2 text-left'>Category</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className='border-b hover:bg-gray-50' key={product.Id}>
                    <td className='py-2 px-2 text-left text-sm'>
                      {product.Id}
                    </td>
                    <td className='py-2 px-2 text-left text-sm'>
                      {product.Name}
                    </td>
                    <td className='py-2 px-2 text-left text-sm'>
                      {product.WQty}
                    </td>
                    <td className='py-2 px-2 text-left text-sm'>
                      {product.SRate}
                    </td>
                    <td className='py-2 px-2 text-left text-sm'>
                      {product.Category}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} Products List
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
