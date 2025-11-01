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
    public async getById(pID: number): Promise<IProduct | null> {
        const prodId = await ProductModel.findOne({ productCode: pID });
        return prodId;
    }

    public async updateProd(productCode: number | string, data: Partial<IProduct>): Promise<IProduct | null> {
        const updateProd = await ProductModel.findOneAndUpdate(
            { productCode: productCode }, 
            { $set: data }, 
            { new: true }
        );
        return updateProd;
    }

    public async deleteProd(pID: number): Promise<void> {
        const delProd = await ProductModel.deleteOne({ productCode: pID });

    }
    
    
}