import { Cart } from "../Cart.js";

export class ClearCart {
    constructor(private readonly cart: Cart) {}

    execute(): void {
        this.cart.clear();
    }
}