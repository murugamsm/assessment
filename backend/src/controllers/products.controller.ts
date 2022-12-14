import { NextFunction, Request, Response } from 'express';
import ProductService from '@/services/products.service';
import { Product } from '@/interfaces/products.interface';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductsController {
  public productService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products: Product[] = await this.productService.findAllProducts();

      res.status(200).json({ data: products });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: CreateProductDto = req.body;
      const product: Product = await this.productService.createProduct(productData);

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
