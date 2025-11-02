import {Request, Response} from 'express';
import { ProductServices } from '../services/product-services';

export class ProductController {
    private productServices: ProductServices;

    constructor(productServices: ProductServices) {
        this.productServices = productServices;
    }

    public async CreateProductController(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.productServices.createProduct(req.body);
            res.status(200).json({ message: 'Produto criado com sucesso!'});

        } catch (e: any) {
            res.status(500).json({ error: e });
        }
    };

    public async GetProductController(req: Request, res: Response): Promise<void> {
        try {
            const allProducts = await this.productServices.getProducts();
            res.status(200).json(allProducts);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    };

    public async GetProductIdController(req: Request, res: Response): Promise<void> {
        const productCode = req.body;

        try {
            const prodId = await this.productServices.getProdById(productCode);
            res.status(200).json(prodId);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    };

    public async UpdateProductController(req: Request, res: Response): Promise<void> {
        const {productCode} = req.body;
        const { name, quantity, category, price } = req.body;

        try {
            const updateProd = await this.productServices.updateProduct(productCode, { name, quantity, category, price });
            res.status(201).send();
        } catch (e: any) {
            res.status(400).json({ error: e });        
        }
    };

    public async DeleteProductController(req: Request, res: Response): Promise<void> {
        const {productCode} = req.body;

        try {
            const delProd = await this.productServices.deleteProduct(productCode);
            res.status(204).send();
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    };
    
    

}