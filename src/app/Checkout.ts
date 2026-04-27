import type { ShippingMethod } from "../domain/shipping/ShippingMethod.js";
import { Money } from "../domain/Money.js"
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";
import { Cart } from "../Cart.js";

type CheckoutError = "EMPTY_CART";

export class Checkout {
    constructor(
        private readonly cart: Cart,
        private readonly shipping: ShippingMethod
    ) {}

    execute(): Result<Money, CheckoutError> {
        if (this.cart.items.length === 0) {
            return fail("EMPTY_CART");
        }

        const totalPrice = this.cart.getTotalPrice();
        const totalWeight = this.cart.getTotalWeight();

        this.shipping.validate(totalWeight);

        const shippingCost = 
            totalPrice.amount > this.getFreeShippingThreshold().amount
                ? new Money(0)
                : this.shipping.calculate(totalWeight, totalPrice);

        return ok(totalPrice.add(shippingCost));
    }

    private getFreeShippingThreshold(): Money {
        return new Money(50000);
    }

    getShippingDetails(): string {
        return `${this.shipping.name()} - Estimated delivery in ${this.shipping.estimateDeliveryDays()} days`;
    }
}