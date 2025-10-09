import express from 'express';
import { ProductController } from '../controllers/product-controllers';
import { ProductServices } from '../services/product-services';
import { ProductRepository } from '../repository/product-repository';

const productRepository = new ProductRepository();
const productServices = new ProductServices(productRepository);
const productController = new ProductController(productServices);

const router = express.Router();

router.get('/', (req, res) => 
    res.json({ message: 'Olá, Mundo' })
);

router.post('/cadastro', (req, res) => 
    productController.CreateProductController(req, res));





export default router;