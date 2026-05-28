import { EventHandler } from "../events/EventHandler";
import { OrderPaidEvent } from "../events/OrderPaidEvent.js";

export class SendEmailOrderPaid implements EventHandler<OrderPaidEvent> {
    async handle(event: OrderPaidEvent): Promise<void> {
        console.log(`Email sent for order ${event.orderId}`);
    }
}
