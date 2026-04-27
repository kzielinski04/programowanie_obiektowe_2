import { Cart } from "../Cart.js";
import type { IProductRepository } from "../domain/IProductRepository.js";
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";

type AddToCartError =
    | "PRODUCT_NOT_FOUND"
    | "INVALID_QUANTITY"
    | "MAX_QUANTITY_EXCEEDED";

export class AddToCart {
    private readonly MAX_QUANTITY = 100;

    constructor(
        private readonly repo: IProductRepository,
        private readonly cart: Cart
    ) {}

    async execute(
        productEan: string,
        quantity: number
    ): Promise<Result<void, AddToCartError>> {
        if (quantity <= 0) {
            return fail("INVALID_QUANTITY");
        }

        if (quantity > this.MAX_QUANTITY) {
            return fail("MAX_QUANTITY_EXCEEDED");
        }

        const product = await this.repo.getByEan(productEan);

        if (!product) {
            return fail("PRODUCT_NOT_FOUND");
        }

        this.cart.addItem(product, quantity);

        return ok(undefined);
    }
}