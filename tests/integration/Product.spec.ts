import request from 'supertest';
import mongoose from 'mongoose';
import { ProductModel } from '../../src/database/MongooseProductModel';
import app from '../../src/index';
describe('Product integration test ' , () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_TEST!); 
    }, 30000);

    beforeEach(async () => {
        await ProductModel.deleteMany({});

        await request(app).post('/cadastro').send({
            productCode: "0001",
            name: "Produto 1",
            quantity: 50,
            category: "categoria",
            price: 5.0,
        });

    });

    afterAll(async () => {
        await ProductModel.deleteMany({});
        await mongoose.connection.close();
    });

    it('deve retornar 200 e mensagem inicial', async () =>{
        const res = await request(app).get('/');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('SmartStore: Plataforma de gerenciamento de estoque.');

    });

    it('deve criar novo produto e retornar 200', async () => {
        const res = await request(app).post('/cadastro').send({
            productCode: "0002" ,
            name: "produto 2",
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

    it('deve buscar por todos os produtos e retornar 200', async () => {
        const res = await request(app).post('/cadastro').send({
            productCode: "0003",
            name: "Produto 3",
            quantity: 50,
            category: "categoria",
            price: 5.0
        });

        const r = await request(app).get('/consulta');

        expect(r.statusCode).toBe(200);

    });

    it('deve buscar pelo produto por id e retornar 200', async () => {
        const res = await request(app).post('/cadastro').send({
            productCode: "9999",
            name: "produto",
            quantity: 50,
            category: "categoria",
            price: 5.0,
        });

        const r = await request(app).get('/consulta/');

        expect(r.statusCode).toBe(200);

    });

    it('deve atualizar informações de um produto', async () =>{
        const prod = await ProductModel.create({
            productCode: "9876",
            name: "Produto 1",
            quantity: 50,
            category: "categoria",
            price: 5.0,
        });
        const res = await request(app).post('/cadastro').send(prod);

        const r = await request(app).put(`/editar/${prod.productCode}`).send({
            name: "Produto Editado",
            quantity: 50,
            category: "categoria",
            price: 5.0
        });
        
        expect(r.statusCode).toBe(201);
    });

    it('deve deletar um produto com sucesso', async () => {
        const prod = await ProductModel.create({
            productCode: "9876",
            name: "Produto 1",
            quantity: 50,
            category: "categoria",
            price: 5.0,
        });
        const res = await request(app).post('/cadastro').send(prod);

        const r = await request(app).delete(`/excluir/${prod.productCode}`);
        
        expect(r.statusCode).toBe(204);
        
    });


});

