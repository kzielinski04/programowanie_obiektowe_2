import { Cart } from "../Cart.js";
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";

type RemoveFromCartError = "PRODUCT_NOT_IN_CART";

export class RemoveFromCart {
    constructor(private readonly cart: Cart) {}

    execute(productEan: string): Result<void, RemoveFromCartError> {
        const itemExists = this.cart.items.some(item => item.getEan() === productEan);

        if (!itemExists) {
            return fail("PRODUCT_NOT_IN_CART");
        }

        this.cart.removeItemByEan(productEan);
        return ok(undefined);
    }
}