import {model, Schema, Document} from 'mongoose';

export const productSchema: Schema = new Schema({
    productCode: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    quantity: {type: Number},
    category: {type: String},
    price: {type: Number}
});

export interface IProduct extends Document {
    productCode: number,
    name: string,
    quantity: number,
    category: string,
    price: number,
}
export const ProductModel = model<IProduct>('Product', productSchema);