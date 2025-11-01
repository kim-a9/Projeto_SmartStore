import express from 'express';

import { ProductController } from '../controllers/product-controllers';
import { ProductServices } from '../services/product-services';
import { ProductRepository } from '../repository/product-repository';

const productRepository = new ProductRepository();
const productServices = new ProductServices(productRepository);
const productController = new ProductController(productServices);


const router = express.Router();

router.get('/', (req, res) => 
    res.json({ message: "SmartStore: Plataforma de gerenciamento de estoque." })
);

router.post('/cadastro', (req, res) => 
    productController.CreateProductController(req, res));

router.get('/consulta', (req, res) => 
    productController.GetProductController(req, res));

router.get('/consulta/:productCode', (req, res) => 
    productController.GetProductIdController(req, res));

router.put('/editar/:productCode', (req, res) => 
    productController.UpdateProductController(req, res));

router.delete('/excluir/:productCode', (req, res) => 
    productController.DeleteProductController(req, res));


export default router;