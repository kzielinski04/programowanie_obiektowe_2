import { CartItem } from "./CartItem.js";
import { Money } from "../src/domain/Money.js"; 

export class Cart {
    private items: CartItem[] = [];

    constructor(items: CartItem[]) {
        this.items = items;
    }

    public printItems() {
        for (var item of this.items) {
            console.log(`Nazwa: ${item.getName()}`);
            console.log(`Opis: ${item.getDescription()}`)
            console.log(`Cena: ${item.getPrice()}`);
            console.log(`Ilość: ${item.getQuantity()}`);
            console.log(`EAN: ${item.getEan()}`);
            console.log("---------------------------");
        }
    }

    public addItem(cartItem: CartItem) {
        for (var existingItem of this.items) {
            if (existingItem.getEan() === cartItem.getEan()) {
                existingItem.setQuantity(existingItem.getQuantity() + cartItem.getQuantity());  
                return;
            }
        }
        this.items.push(cartItem);
    }

    public removeItem(cartItem: CartItem) {
        this.items = this.items.filter(item => item.getEan() !== cartItem.getEan());
    }

    getTotalWeight(): number {
        return this.items.reduce((sum, item) => sum + item.getQuantity(), 0);
    }

    getTotalPrice(): Money {
        const totalAmount = this.items.reduce((sum, item) => sum + (item.getPrice() * item.getQuantity()), 0);
        return new Money(totalAmount);
    }
}