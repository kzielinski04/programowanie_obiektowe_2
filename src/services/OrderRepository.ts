export interface IOrderRepository {
    save(order: any): Promise<void>;
}