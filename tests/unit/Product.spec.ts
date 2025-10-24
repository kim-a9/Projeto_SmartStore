import { ProductServices } from "../../src/services/product-services";
import { ProductRepository } from "../../src/repository/product-repository";


describe("Product unit test ", () => {
  let createProd: ProductServices;
  let getAllProd: ProductServices;
  let getProdId: ProductServices;
  let updateProd: ProductServices;
  let deleteProd: ProductServices;
  let prodRepo: ProductRepository;

  beforeEach(() => {
    prodRepo = new ProductRepository();
    createProd = new ProductServices(prodRepo);
    getAllProd = new ProductServices(prodRepo);
    getProdId = new ProductServices(prodRepo);
    updateProd = new ProductServices(prodRepo);
    deleteProd = new ProductServices(prodRepo);
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
      getById: jest.fn(),
      updateProd: jest.fn(),
      deleteProd: jest.fn(),
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
      getById: jest.fn(),
      updateProd: jest.fn(),
      deleteProd: jest.fn(),
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
      getById: jest.fn(),
      updateProd: jest.fn(),
      deleteProd: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);
    const product = await prodService.createProduct(newProd as any);

    const getProd = await prodService.getProducts();

    expect(getProd).not.toBeNull();
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    expect(mockRepository.getAll).toHaveReturnedTimes(1);

  });

  it("deve buscar um produto por id e retornar com sucesso", async () => {
    const prod = {
      productCode: "9999",
      name: "produto",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
    const mockRepository = {
      create: jest.fn().mockResolvedValue(prod),
      getAll: jest.fn(),
      getById: jest.fn().mockResolvedValue(prod),
      updateProd: jest.fn(),
      deleteProd: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);
    const product = await prodService.createProduct(prod as any);

    const getProdId = await prodService.getProdById(prod.productCode);

    expect(getProdId).not.toBeNull();
    expect(mockRepository.getById).toHaveBeenCalledTimes(1);
    expect(mockRepository.getById).toHaveReturnedTimes(1);

  });

  it('deve atualizar informações de um produto', async () =>{
    const product1 = {
      productCode: '9999',
      name: "produto a",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
    const product2 = {
      ...product1,
      name: "produto b",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
     const mockRepository = {
      create: jest.fn().mockResolvedValue(product1),
      getAll: jest.fn(),
      getById: jest.fn().mockResolvedValue(product1),
      updateProd: jest.fn().mockResolvedValue(product2),
      deleteProd: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);
    const createProd = await prodService.createProduct(product1 as any);


    const updateProd = await prodService.updateProduct('9999', product2 as any);

    expect(updateProd).toEqual(product2);
    expect(mockRepository.updateProd).toHaveBeenCalledWith('9999', product2);
    expect(mockRepository.updateProd).toHaveBeenCalledTimes(1);
    expect(mockRepository.updateProd).toHaveReturnedTimes(1);

    
  });

  it('deve lançar erro ao tentar atualizar produto com código inexistente', async () => {
     const product1 = {
      productCode: '9999',
      name: "produto a",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
    const product2 = {
      productCode: '9999',
      name: "produto b",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
     
    const mockRepository = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      updateProd: jest.fn().mockRejectedValueOnce(new Error('Não foi possível localizar o produto.')),
      deleteProd: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);
    const createProd = await prodService.createProduct(product1 as any);

    await expect(prodService.updateProduct('', product2 as any))
      .rejects.toThrow('Não foi possível localizar o produto.');

  });

  it('deve deletar um produto com sucesso', async () => {
    const prod = {
      productCode: "9999",
      name: "produto",
      quantity: 50,
      category: "categoria",
      price: 5.0,
    }
    const mockRepository = {
      create: jest.fn().mockResolvedValue(prod),
      getAll: jest.fn(),
      getById: jest.fn().mockResolvedValue(prod),
      updateProd: jest.fn(),
      deleteProd: jest.fn(),
    };
    const prodService = new ProductServices(mockRepository);
    const product = await prodService.createProduct(prod as any);

    const delProd = await prodService.deleteProduct("9999");

    expect(delProd).toBeNull();
  })






});
