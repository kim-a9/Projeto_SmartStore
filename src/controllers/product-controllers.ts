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
        try {
            const productCode = req.body;
            
            const prodId = await this.productServices.getProdById(productCode);

            // if(!prodId){
            //     throw new Error('Id inválido. Verifique as informações inseridas e tente novamente.');
            // }
            res.status(200).json(prodId);
        } catch (e: any) {
            res.status(400).json({ error: e });
        }
    }

    public async UpdateProductController(req: Request, res: Response): Promise<void> {
        console.log("PUT /editar/:productCode - productCodeParam:", req.params.productCode);
        try{
            const {productCode} = req.body;
            const { name, quantity, category, price } = req.body;

            const updateProd = await this.productServices.updateProduct(productCode, { name, quantity, category, price });

            // if(!updateProd){
            //     throw new Error('Não foi possível localizar o produto.')
            // }
            res.status(201).json(updateProd)

        } catch (error: any){
            console.error("ERRO na rota PUT /editar/:productCode:", error.message, error.stack);
        }
    }

    public async DeleteProductController(req: Request, res: Response): Promise<void> {
        const productCode = req.body;

        const delProd = await this.productServices.deleteProduct(productCode);

        res.status(204).json(delProd)
    }
    
    

}