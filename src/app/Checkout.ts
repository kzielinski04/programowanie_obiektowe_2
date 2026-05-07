import type { ShippingMethod } from "../domain/shipping/ShippingMethod.js";
import { Money } from "../domain/Money.js"
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";
import { Cart } from "../Cart.js";
import type { PaymentService } from "../services/PaymentService.js";
import type { IOrderRepository } from "../services/OrderRepository.js";
import { NotificationService } from "../services/NotificationService.js";
import { Validator } from "../services/Validator.js";
import { LoggingService } from "../services/LoggingService.js";
import { DiscountService } from "../services/DiscountService.js";

type CheckoutError = "EMPTY_CART" | "PAYMENT_FAILED";

export class Checkout {
    constructor(
        private readonly shipping: ShippingMethod,
        private readonly paymentService: PaymentService,
        private readonly repo: IOrderRepository,
        private readonly notifier: NotificationService,
        private readonly validator: Validator,
        private readonly logger: LoggingService,
        private readonly discountService: DiscountService
    ) {}

    async execute(cart: Cart): Promise<Result<void, CheckoutError>> {
        if (!this.validator.validate(cart)) {
            return fail("EMPTY_CART");
        }

        const total = cart.getTotalPrice();

        const success = this.paymentService.pay(total);

        if (!success) {
            return fail("PAYMENT_FAILED");
        }

        await this.repo.save({
            items: cart.items, total
        });

        this.notifier.send();

        return ok(undefined);
        
        // if (this.cart.items.length === 0) {
        //     return fail("EMPTY_CART");
        // }

        // const totalPrice = this.cart.getTotalPrice();
        // const totalWeight = this.cart.getTotalWeight();

        // this.shipping.validate(totalWeight);

        // const shippingCost = 
        //     totalPrice.amount > this.getFreeShippingThreshold().amount
        //         ? new Money(0)
        //         : this.shipping.calculate(totalWeight, totalPrice);

        // return ok(totalPrice.add(shippingCost));
    }

    private getFreeShippingThreshold(): Money {
        return new Money(50000);
    }

    getShippingDetails(): string {
        return `${this.shipping.name()} - Estimated delivery in ${this.shipping.estimateDeliveryDays()} days`;
    }
}