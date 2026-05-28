import { EventHandler } from "../events/EventHandler.js";
import { OrderPaidEvent } from "../events/OrderPaidEvent.js";

export class TrackAnalyticsOnOrderPaid implements EventHandler<OrderPaidEvent> {
    async handle(event: OrderPaidEvent): Promise<void> {
        console.log(`Analytics tracked for order ${event.orderId}, total: ${event.total.format()}`);
    }
}
