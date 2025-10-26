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
    public async getById(id: string): Promise<IProduct | null> {
        const prodId = await ProductModel.findOne({ productCode: id });
        return prodId;
    }

    public async updateProd(id: string, data: IProduct): Promise<IProduct | null> {
        const updateProd = await ProductModel.findOneAndUpdate(
            { productCode: id }, 
            { $set: data }, 
            { new: true }
        );
        return updateProd;
    }

    public async deleteProd(id: string): Promise<void> {
        const delProd = await ProductModel.deleteOne({ productCode: id });

    }
    
    
}