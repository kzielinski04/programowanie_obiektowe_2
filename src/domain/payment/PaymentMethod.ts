// src/domain/payment/PaymentMethod.ts
import type { Money } from "../Money.js";
import type { Result } from "../../shared/Result.js";

export type PaymentError = "PAYMENT_FAILED" | "REFUND_FAILED" | "UNSUPPORTED_CURRENCY";

export interface PaymentMethod {
    pay(amount: Money): Promise<Result<void, PaymentError>>;
    refund(amount: Money): Promise<Result<void, PaymentError>>;
    supportsCurrency(currency: string): boolean;
    name(): string;
}