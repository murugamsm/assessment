import App from '@/app';
import validateEnv from '@utils/validateEnv';
import ProductsRoute from './routes/products.route';

validateEnv();

const app = new App([new ProductsRoute()]);

app.listen();
