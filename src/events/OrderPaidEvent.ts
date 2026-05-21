import type { DomainEvent } from "./DomainEvent.js";
import type { Money } from "../domain/Money.js";

export class OrderPaidEvent implements DomainEvent {
    readonly name = "OrderPaid";
    readonly occuredAt = new Date();

    constructor(
        public readonly orderId: string,
        public readonly total: Money
    ) {}
}
