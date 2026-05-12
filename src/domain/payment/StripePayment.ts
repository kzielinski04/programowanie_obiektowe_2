// src/domain/payment/StripePayment.ts
import type { PaymentMethod, PaymentError } from "./PaymentMethod.js";
import type { Money } from "../Money.js";
import { Result, ok, fail } from "../../shared/Result.js";

export class StripePayment implements PaymentMethod {
    private supportedCurrencies = ["USD", "EUR", "PLN", "GBP"];

    async pay(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[Stripe] Pobieranie opłaty: ${amount.format()}`);
        const success = Math.random() > 0.2; // Większa szansa na sukces dla testów
        return success ? ok(undefined) : fail("PAYMENT_FAILED");
    }

    async refund(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[Stripe] Przetwarzanie zwrotu: ${amount.format()}`);
        return ok(undefined);
    }

    supportsCurrency(currency: string): boolean {
        return this.supportedCurrencies.includes(currency.toUpperCase());
    }

    name(): string {
        return "Stripe";
    }
}