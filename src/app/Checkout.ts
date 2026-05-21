import type { ShippingMethod } from "../domain/shipping/ShippingMethod.js";
import { Money } from "../domain/Money.js";
import type { Result } from "../shared/Result.js";
import { ok, fail } from "../shared/Result.js";
import type { Cart } from "../Cart.js";
import type { PaymentMethod } from "../domain/payment/PaymentMethod.js";
import type { IOrderRepository } from "../services/OrderRepository.js";
import type { NotificationService } from "../services/NotificationService.js";
import type { Validator } from "../services/Validator.js";
import type { LoggingService } from "../services/LoggingService.js";
import type { DiscountService } from "../services/DiscountService.js";
import type { EventBus } from "../shared/EventBus.js";
import { OrderPaidEvent } from "../events/OrderPaidEvent.js";

type CheckoutError = "EMPTY_CART" | "PAYMENT_FAILED" | "UNSUPPORTED_CURRENCY";

export class Checkout {
    constructor(
        private readonly shipping: ShippingMethod,
        private readonly paymentMethod: PaymentMethod,
        private readonly repo: IOrderRepository,
        private readonly notifier: NotificationService,
        private readonly validator: Validator,
        private readonly logger: LoggingService,
        private readonly discountService: DiscountService,
        private readonly eventBus: EventBus,
    ) {}

    async execute(cart: Cart): Promise<Result<void, CheckoutError>> {
        if (!this.validator.validate(cart)) {
            return fail("EMPTY_CART");
        }

        const total = cart.getTotalPrice();

        const currentCurrency = total.currency;

        if (!this.paymentMethod.supportsCurrency(currentCurrency)) {
            this.logger.log(`Metoda ${this.paymentMethod.name()} nie obsługuje waluty ${currentCurrency}`);
            return fail("UNSUPPORTED_CURRENCY");
        }

        const paymentResult = await this.paymentMethod.pay(total);

        if (!paymentResult.success) {
            return fail("PAYMENT_FAILED");
        }

        await this.repo.save({
            items: cart.items, 
            total
        });

        this.notifier.send();

        await this.eventBus.publish(new OrderPaidEvent("order-1", total));

        return ok(undefined);
    }

    getShippingDetails(): string {
        return `${this.shipping.name()} - Estimated delivery in ${this.shipping.estimateDeliveryDays()} days`;
    }
}