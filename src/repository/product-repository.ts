import { IProduct, ProductModel } from '../database/MongooseProductModel';

export class ProductRepository {
    public async create(data: IProduct): Promise<IProduct> {
        const newProduct = new ProductModel(data);
        return await newProduct.save();
    };
    
}