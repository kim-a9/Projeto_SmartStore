import {Request, Response} from 'express';
import { ProductServices } from '../services/product-services';

export class ProductController {
    private productServices: ProductServices;

    constructor(productServices: ProductServices) {
        this.productServices = productServices;
    }

    public async CreateProductController(req: Request, res: Response): Promise<void> {
        const product = await this.productServices.createProduct(req.body);

        if(!product) {
            throw new Error('Verifique os dados inseridos e tente novamente');
        }
        res.status(200).json({ message: 'Produto criado com sucesso!'});
    }

    public async GetProductController(req: Request, res: Response): Promise<void> {
        const allProducts = await this.productServices.getProducts();

        if(!allProducts) {
            throw new Error('Não foi possível localizar os produtos.');
        }
        res.status(200).json(allProducts);
    }

    public async GetProductIdController(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        const prodId = await this.productServices.getProdById(id);

        if(!prodId){
            throw new Error('Id inválido. Verifique as informações inseridas e tente novamente.');
        }
        res.status(200).json(prodId);
    }

    public async UpdateProductController(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, quantity, category, price } = req.body;
        

        const updateProd = await this.productServices.updateProduct(id, req.body);

        if(!updateProd){
            throw new Error('Não foi possível localizar o produto.')
        }
        res.status(201).json(updateProd)
    }

    public async DeleteProductController(req: Request, res: Response): Promise<void> {
        const {id} = req.params;

        const delProd = await this.productServices.deleteProduct(id);

        if(!delProd){
            throw new Error('Não foi possível localizar o produto.')
        }
        res.status(201).json(delProd)
        
    }
    
    

}