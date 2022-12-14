import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProductsController from '@/controllers/products.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.productsController.getProducts);
    this.router.post(`${this.path}/create`, validationMiddleware(CreateProductDto, 'body'), this.productsController.createProduct);
  }
}

export default ProductsRoute;
