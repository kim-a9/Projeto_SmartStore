import {ProductRepository} from '../repository/product-repository';
import {IProduct} from '../database/MongooseProductModel';

interface IProductData {
    name?: string,
    quantity?: number,
    category?: string,
    price?: number
}

export class ProductServices{
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }
    
    public async createProduct(data: IProduct): Promise<IProduct> {
        return await this.productRepository.create(data);
    }

    public async getProducts(): Promise<IProduct[] | null> {
        return await this.productRepository.getAll();
    }

    public async getProdById(id: string): Promise<IProduct | null> {
        return await this.productRepository.getById(id);
    }

    public async updateProduct(id: string, data: IProduct): Promise<IProduct | null> {
        // const findProd = await this.productRepository.getById(id);

        const updatedProd = await this.productRepository.updateProd(id, data);
        return updatedProd;
    }
    
    public async deleteProduct(id: string): Promise<IProduct | null> {
        const delProd = await this.productRepository.deleteProd(id);
        return delProd;
    }


}