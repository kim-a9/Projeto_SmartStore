import { IProduct, ProductModel } from '../database/MongooseProductModel';

// interface IProductInput{
//     name?: string,
//     quantity?: number,
//     category?: string,
//     price?: number,
// }

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

        // const prodId = await ProductModel.findOne({ productCode: id }).updateOne({ $set: data});
        // const updateProd = await ProductModel.updateOne({ productCode: id }, { data: IProductInput})
    
    }

    public async deleteProd(id: string): Promise<IProduct | null> {
        const delProd = await ProductModel.findByIdAndDelete(id);
        return delProd;
    }
    
    
}