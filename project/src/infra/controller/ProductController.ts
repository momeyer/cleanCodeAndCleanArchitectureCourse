import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import { ProductUseCases } from "../../useCases/ProductUseCases";
import Http from "../http/Http";

export default class orderControllerProductController {
  constructor(readonly http: Http, readonly repositoryFactory: RepositoryFactory) {
    const productRepository = repositoryFactory.createProductRepository();

    http.on("get", "/products", async function (params: any, body: any): Promise<any> {
      const productUseCases = new ProductUseCases(productRepository);
      const output = await productUseCases.list();
      return output;
    });

    http.on("get", "/products/:id", async function (params: any, body: any): Promise<any> {
      const productUseCases = new ProductUseCases(productRepository);

      const output = await productUseCases.search(Number(params.id));
      return output;
    });
  }
}
