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

    public async getProdById(id: string): Promise<IProduct | null> {
        return await this.productRepository.getById(id);
    }
    


}