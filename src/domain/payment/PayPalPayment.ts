import { PaymentMethod, PaymentError } from "./PaymentMethod.js";
import { Money } from "../Money.js";
import { Result, ok, fail } from "../../shared/Result.js";

export class PayPalPayment implements PaymentMethod {
    async pay(
        amount: Money
    ): Promise<Result<void, PaymentError>> {
        console.log(`Stripe charged ${amount.format()}`);
        
        const success = Math.random() > 0.5;

        return success ? ok(undefined) : fail("PAYMENT_FAILED");
    }

    name(): string {
        return "PayPal";
    }
}