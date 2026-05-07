import { Cart } from "../Cart.js";

export class Validator {
    validate(cart: Cart): boolean {
        return cart.totalItems() > 0;
    }
}