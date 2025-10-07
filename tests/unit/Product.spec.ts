import { ProductServices } from '../../src/services/product-services';
import { ProductRepository } from '../../src/repository/product-repository';

describe('Product unit test ' , () => {
    let createProd: ProductServices;
    let prodRepo: ProductRepository;

    beforeEach(() => {
        prodRepo = new ProductRepository();
        createProd = new ProductServices(prodRepo);
    });

    beforeAll(() => {
        jest.clearAllMocks();
    });
    it('deve criar um produto e armazená-lo com sucesso', async () => {
        const newProd = {
            productCode: "1234" ,
            name: "Produto modelo",
            quantity: 50,
            category: "categoria",
            price: 5.00
        }
        const mockRepository = {
            create: jest.fn().mockResolvedValue(newProd),
        }
        const prodService = new ProductServices(mockRepository);

        const product = await prodService.createProduct(newProd as any);

        expect(product).toMatchObject(newProd);
        expect(mockRepository.create).toHaveBeenCalledTimes(1);
        expect(mockRepository.create).toHaveReturnedTimes(1);

    });

    it('deve rejeitar um produto sem nome ou código', async () => {
        const prodData = {
            productCode: "" ,
            name: "",
            quantity: 50,
            category: "categoria",
            price: 5.00
        }

        const mockRepository = {
            create: jest.fn().mockRejectedValue(prodData),
        }
        const prodService = new ProductServices(mockRepository);

        expect(mockRepository.create).not.toHaveBeenCalled();

    });



});