import { ProductServices } from "../../src/services/product-services";
import { ProductRepository } from "../../src/repository/product-repository";

describe("Product unit test ", () => {
  let createProd: ProductServices;
  let getAllProd: ProductServices;
  let prodRepo: ProductRepository;

  beforeEach(() => {
    prodRepo = new ProductRepository();
    createProd = new ProductServices(prodRepo);
    getAllProd = new ProductServices(prodRepo);

  });

  beforeAll(() => {
    jest.clearAllMocks();
  });
  it("deve criar um produto e armazená-lo com sucesso", async () => {
    const newProd = {
      productCode: "1234",
      name: "Produto modelo",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    };
    const mockRepository = {
      create: jest.fn().mockResolvedValue(newProd),
      getAll: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);

    const product = await prodService.createProduct(newProd as any);

    expect(product).toMatchObject(newProd);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveReturnedTimes(1);
  });

  it("deve rejeitar um produto sem nome ou código", async () => {
    const prodData = {
      productCode: "",
      name: "",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    };

    const mockRepository = {
      create: jest.fn().mockRejectedValue(prodData),
      getAll: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);

    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it("deve consultar todos os produtos registrados com sucesso", async () => {
      const newProd = [{
        productCode: "1235",
        name: "Produto 1",
        quantity: 50,
        category: "categoria",
        price: 5.0,
    }, 
      {
        productCode: "5678",
        name: "Produto 2",
        quantity: 50,
        category: "categoria",
        price: 5.0
      }];

    const mockRepository = {
      create: jest.fn().mockResolvedValue(newProd),
      getAll: jest.fn().mockResolvedValue(newProd),
    };
    const prodService = new ProductServices(mockRepository);
    const product = await prodService.createProduct(newProd as any);

    const getProd = await prodService.getProducts();

    expect(getProd).not.toBeNull();
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockRepository.getAll).toHaveReturnedTimes(1);

  });


  
});
