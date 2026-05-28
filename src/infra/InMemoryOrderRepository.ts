import type { IOrderRepository } from "../services/OrderRepository";

export class InMemoryOrderRepository implements IOrderRepository {
    async save(order: unknown): Promise<void> {
        console.log("[Order] Zapisano zamówienie:", order);
    }
}
