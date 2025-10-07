import supertest from 'supertest';
import mongoose from 'mongoose';
import { ProductModel } from '../../src/database/MongooseProductModel';

describe('Product unit test ' , () => {
    let prodId: mongoose.Types.ObjectId;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST!);
    });

    beforeEach(async () => {
        ProductModel.deleteMany({});
    });








});

