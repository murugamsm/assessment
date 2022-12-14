import { v4 as uuidv4 } from 'uuid';
import { Product } from '@/interfaces/products.interface';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import db from '@databases';
import { CreateProductDto } from '@/dtos/products.dto';

class ProductService {
  public async findAllProducts(): Promise<Product[]> {
    return await db('Product').orderBy('Id', 'desc');
  }

  public async createProduct(productData: CreateProductDto): Promise<Product> {
    if (isEmpty(productData)) throw new HttpException(400, 'productData is empty');

    const result: any = await db
      .from<Product>('Product')
      .insert({
        Id: uuidv4(),
        ...productData,
      })
      .returning('Id');
    return result[0] as Product;
  }
}

export default ProductService;
