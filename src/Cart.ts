import { CartItem } from "./CartItem.js";
import { Money } from "./domain/Money.js";
import { Product } from "./Product.js";

export class Cart {
    items: CartItem[] = [];

    constructor(items: CartItem[] = []) {
        this.items = items;
    }

    public addItem(product: Product, quantity: number) {
        for (var existingItem of this.items) {
            if (existingItem.getEan() === product.getEan()) {
                existingItem.setQuantity(existingItem.getQuantity() + quantity);  
                return;
            }
        }
        this.items.push(new CartItem(product, quantity));
    }

    public removeItemByEan(ean: string) {
        this.items = this.items.filter(item => item.getEan() !== ean);
    }

    public clear() {
        this.items = [];
    }

    public printItems() {
        for (var item of this.items) {
            console.log(`Nazwa: ${item.getName()}`);
            console.log(`Ilość: ${item.getQuantity()}`);
            console.log(`EAN: ${item.getEan()}`);
            console.log("---------------------------");
        }
    }

    getTotalWeight(): number {
        return this.items.reduce((sum, item) => sum + item.getQuantity(), 0);
    }

    getTotalPrice(): Money {
        const totalAmount = this.items.reduce((sum, item) => sum + (item.getPrice() * item.getQuantity()), 0);
        return new Money(totalAmount);
    }
}