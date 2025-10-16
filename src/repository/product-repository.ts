import { IProduct, ProductModel } from '../database/MongooseProductModel';

export class ProductRepository {
    public async create(data: IProduct): Promise<IProduct> {
        const newProduct = new ProductModel(data);
        return await newProduct.save();
    };

    public async getAll(): Promise<IProduct[]> {
        const allProducts = await ProductModel.find();
        return allProducts;
    }
    
}