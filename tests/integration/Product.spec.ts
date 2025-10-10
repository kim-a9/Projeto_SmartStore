import request from 'supertest';
import mongoose from 'mongoose';
import { ProductModel } from '../../src/database/MongooseProductModel';
import app from '../../src/index';
// import app from '../../src/server';
describe('Product integration test ' , () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST!);      
    }, 30000);

    beforeEach(async () => {
        await ProductModel.deleteMany({});
    });

    afterAll(async () => {
        await ProductModel.deleteMany({});
        await mongoose.connection.close();
    });

    it('deve retornar 200 e mensagem inicial', async () =>{
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('Olá, Mundo');

    });

    it('deve criar novo produto e retornar 200', async () => {
        const res = await request(app).post('/cadastro').send({
            productCode: "0001" ,
            name: "produto 1",
            quantity: 50,
            category: "categoria",
            price: 5.00
        });

        expect(res.body.message).toEqual('Produto criado com sucesso!');
        expect(res.statusCode).toBe(200);
    });

    it('deve retornar erro ao adicionar produto com campos inválidos', async () =>{
           const res = await request(app).post('/cadastro').send({
            productCode: "" ,
            name: "",
            quantity: 50,
            category: "categoria",
            price: 5.00
        });
        

        expect(res.statusCode).toBe(500);
    })







});

