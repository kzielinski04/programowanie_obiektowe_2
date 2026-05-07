export class DiscountService {
    applyDiscount(price: number, discountAmount: number): number {
        return price * discountAmount / 100;
    }
}