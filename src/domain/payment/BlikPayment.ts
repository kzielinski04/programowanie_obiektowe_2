// src/domain/payment/BlikPayment.ts
import type { PaymentMethod, PaymentError } from "./PaymentMethod.js";
import type { Money } from "../Money.js";
import { Result, ok, fail } from "../../shared/Result.js";

export class BlikPayment implements PaymentMethod {
    async pay(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[BLIK] Oczekiwanie na potwierdzenie transakcji w aplikacji bankowej na kwotę: ${amount.format()}`);
        return ok(undefined);
    }

    async refund(amount: Money): Promise<Result<void, PaymentError>> {
        console.log(`[BLIK] Natychmiastowy zwrot środków na konto powiązane z BLIK: ${amount.format()}`);
        return ok(undefined);
    }

    supportsCurrency(currency: string): boolean {
        return currency.toUpperCase() === "PLN";
    }

    name(): string {
        return "BLIK";
    }
}