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

    public async getProdById(productCode: number): Promise<IProduct | null> {
        return await this.productRepository.getById(productCode);
    }

    public async updateProduct(productCode: number | string, data: Partial<IProduct>): Promise<IProduct | null> {
        const updatedProd = await this.productRepository.updateProd(productCode, data);
        return updatedProd;
    }
    
    public async deleteProduct(productCode: number): Promise<void> {
        const delProd = await this.productRepository.deleteProd(productCode);
        return delProd;
    }


}