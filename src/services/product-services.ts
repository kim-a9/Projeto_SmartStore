import {ProductRepository} from '../repository/product-repository';
import {IProduct} from '../database/MongooseProductModel';

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

    public async getProdById(pID: number): Promise<IProduct | null> {
        return await this.productRepository.getById(pID);
    }

    public async updateProduct(pID: number, data: IProduct): Promise<IProduct | null> {
        const updatedProd = await this.productRepository.updateProd(pID, data);
        return updatedProd;
    }
    
    public async deleteProduct(pID: number): Promise<void> {
        const delProd = await this.productRepository.deleteProd(pID);
        return delProd;
    }


}