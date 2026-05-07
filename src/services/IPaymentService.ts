import { Money } from "../domain/Money.js";

export interface IPaymentService {
    pay(amount: Money): boolean;
}