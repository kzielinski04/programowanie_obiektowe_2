import { IProductRepository } from "../domain/IProductRepository.js";
import { Product } from "../Product.js";
// import { Money } from "../domain/Money";

function requireProduct(result: ReturnType<typeof Product.create>): Product {
    if (!result.success) {
        throw new Error(`Failed to create product: ${result.error}`);
    }
    return result.data;
}

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = [
        requireProduct(Product.create(5000, "laptop", "Laptop", "1111111111111")),
        requireProduct(Product.create(700, "mouse", "Mouse", "2222222222222")),
    ];

    async save(): Promise<void> {
        console.log();
    }

    async getByEan(ean: string): Promise<Product | null> {
        return this.products.find(p => p.getEan() === ean) ?? null;
    }

    async list(): Promise<Product[]> {
        return this.products;
    }
}
