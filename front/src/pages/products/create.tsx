/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';

import { createProduct } from '@/lib/api';
import { Product } from '@/lib/types';

import Button from '@/components/buttons/Button';
import FieldError from '@/components/FieldError';
import Layout from '@/components/layout/Layout';

import Vercel from '~/svg/Vercel.svg';

const ProductSchema = Yup.object().shape({
  Name: Yup.string().required('Name field is required!'),
  WQty: Yup.number().required('Quantity field is required!'),
  SRate: Yup.number().required('SRate field is required!'),
  Category: Yup.string().required('Category field is required!'),
});

export default function CreateProductPage() {
  const [productId, setProductId] = useState<string>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (values: Partial<Product>) => {
    try {
      const { Id } = await createProduct(values);
      setProductId(Id);
    } catch (error: any) {
      setError(error.toString());
    }
  };
  return (
    <Layout>
      <Head>
        <title>Create Product</title>
      </Head>
      <main>
        <section className='bg-white'>
          <div className='flex min-h-screen flex-col items-center justify-center text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4 mb-8'>Create Product</h1>

            {productId && (
              <div className='mb-8 rounded-md border border-green-200 bg-green-50 py-2 px-8 leading-[24px]'>
                Product created successfully. New product Id: <br />
                <span className='font-medium text-green-700'>{productId}</span>
                <p>
                  <Link href='/products' className='text-blue-600'>
                    Go back to list
                  </Link>
                </p>
              </div>
            )}

            {error && (
              <div className='mb-8 rounded-md border border-red-200 bg-red-50 py-2 px-8 leading-[24px]'>
                There was an error saving the product: <br />
                <span className='font-medium text-red-700'>{error}</span>
                <p>
                  <Link href='/products' className='text-blue-600'>
                    Go back to list
                  </Link>
                </p>
              </div>
            )}

            <Formik
              initialValues={{
                Name: '',
                WQty: 0,
                SRate: 0,
                Category: '',
              }}
              validationSchema={ProductSchema}
              onSubmit={(values) => {
                handleSubmit({
                  ...values,
                  WQty: parseInt(values.WQty as unknown as string), // Strange, but formik send this as string rather than number
                  SRate: parseInt(values.SRate as unknown as string),
                });
              }}
            >
              {({ errors, touched }) => (
                <Form className='w-full max-w-[500px] space-y-4 px-8 text-start'>
                  <div className='w-full'>
                    <label>Name</label>
                    <Field
                      name='Name'
                      className='border-1 block w-full rounded-md border border-gray-400 bg-white p-2 focus:outline-blue-400 focus:ring-0'
                    />
                    {errors.Name && touched.Name && (
                      <FieldError message={errors.Name} />
                    )}
                  </div>
                  <div className='w-full'>
                    <label>Quantity</label>
                    <Field
                      name='WQty'
                      className='border-1 block w-full rounded-md border border-gray-400 bg-white p-2 focus:outline-blue-400 focus:ring-0'
                    />
                    {errors.WQty && touched.WQty && (
                      <FieldError message={errors.WQty} />
                    )}
                  </div>
                  <div className='w-full'>
                    <label>Rate</label>
                    <Field
                      name='SRate'
                      className='border-1 block w-full rounded-md border border-gray-400 bg-white p-2 focus:outline-blue-400 focus:ring-0'
                    />
                    {errors.SRate && touched.SRate && (
                      <FieldError message={errors.SRate} />
                    )}
                  </div>
                  <div className='w-full'>
                    <label>Category</label>
                    <Field
                      name='Category'
                      className='border-1 block w-full rounded-md border border-gray-400 bg-white p-2 focus:outline-blue-400 focus:ring-0'
                    />
                    {errors.Category && touched.Category && (
                      <FieldError message={errors.Category} />
                    )}
                  </div>

                  <div className='flex items-center justify-center gap-4 pt-4'>
                    <Button type='reset' variant='light'>
                      Reset
                    </Button>
                    <Button type='submit' variant='primary'>
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} Products List
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}
