// src/domain/payment/GooglePayPayment.ts
import type { PaymentMethod, PaymentError } from "./PaymentMethod.js";
import type { Money } from "../Money.js";
import { Result, ok, fail } from "../../shared/Result.js";

export class GooglePayPayment implements PaymentMethod {
    private supportedCurrencies = ["USD", "EUR", "PLN"];

    async pay(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[Google Pay] Autoryzacja tokenem biometrycznym na kwotę: ${amount.format()}`);
        return ok(undefined);
    }

    async refund(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[Google Pay] Zwrot na kartę podpiętą pod portfel: ${amount.format()}`);
        return ok(undefined);
    }

    supportsCurrency(currency: string): boolean {
        return this.supportedCurrencies.includes(currency.toUpperCase());
    }

    name(): string {
        return "GooglePay";
    }
}