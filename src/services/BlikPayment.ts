import { IPaymentService } from "./IPaymentService.js";
import { Money } from "../domain/Money.js";

export class BlikPayment implements IPaymentService {
    pay(amount: Money): boolean {
        console.log("Blik Payment");
        return Math.random() > 0.5;
    }
}