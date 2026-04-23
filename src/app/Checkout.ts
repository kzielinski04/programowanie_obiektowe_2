import type { ShippingMethod } from "../domain/shipping/ShippingMethod.js";
import { Money } from "../domain/Money.js";
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";
import { Cart } from "../Cart.js";

export function isSuccess<T, E>(
    result: Result<T, E>
): result is { success: true; data: T } {
    return result.success;
} 

// Uzycie
// if (isSuccess(result)) {
//     result.data;
// }

type CheckoutError =
    | "EMPTY_CART"
    | "PAYMENT_FAILED";

export class Checkout {
    private shippingMethod?: ShippingMethod;

    constructor(private readonly shipping: ShippingMethod, private totalWeight: number, private cartValue: Money) {}

    setShippingMethod(method: ShippingMethod): void {
        method.validate(this.totalWeight);
        this.shippingMethod = method;
    }

    getTotalCost(): Money {
        if (!this.shippingMethod) {
            throw new Error("Shipping method not selected");
        }

        const shippingCost = this.shippingMethod.calculate(this.totalWeight, this.cartValue);
        return new Money(this.cartValue.amount + shippingCost.amount);
    }

    getShippingDetails(): string {
        if (!this.shippingMethod) {
            return "No shipping method selected";
        }

        return `${this.shippingMethod.name()} - Estimated delivery in ${this.shippingMethod.estimateDeliveryDays()} days`;
    }

    calculate(cart: Cart): Result<Money, CheckoutError> {
        if (cart.items.length === 0) {
            return fail("EMPTY_CART");
        }

        // symulacja
        const paymentSuccess = Math.random() > 0.5;

        const shippingCost =
            cart.getTotalPrice().amount > this.getFreeShippingThreshold().amount
                ? new Money(0)
                : this.shipping.calculate(cart.getTotalWeight());
        

        return ok(cart.getTotalPrice().add(shippingCost));

        // if (!paymentSuccess) {
        //     return fail("PAYMENT_FAILED");
        // }
        
        // try {
        //     const finalAmount = this.getTotalCost();
        //     return ok(finalAmount);
        // } catch (e) {
        //     throw e; 
        // }
    }
}