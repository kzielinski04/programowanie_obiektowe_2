import type { IPaymentService } from "./IPaymentService.js";
import { Money } from "../domain/Money.js";

export class Payment implements IPaymentService {
    pay(amount: Money): boolean {
        return Math.random() > 0.5;
    }
}