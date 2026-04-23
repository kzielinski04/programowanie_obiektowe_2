import { CartItem } from "./CartItem.js";
import { Product } from "./Product.js";
import { CourierShipping } from "./domain/shipping/CourierShipping.js";
import { ExpressShipping } from "./domain/shipping/ExpressShipping.js";
import { Cart } from "./Cart.js";
import { Checkout } from "../src/app/Checkout.js";
import { Money } from "./domain/Money.js";

async function main() {
    const product1 = new Product(10099, "description1", "name1", "1111111111111");
    const item1 = new CartItem(product1, 1);
    
    const product2 = new Product(23329, "description2", "name2", "1111111111112");
    const item2 = new CartItem(product2, 2);

    const cart = new Cart([item1, item2]);
    
    const totalWeight = cart.getTotalWeight();
    const cartValue = cart.getTotalPrice();

    console.log(`Cart value: ${cartValue.format()}`);
    console.log(`Total weight: ${totalWeight}kg`);

    try {
        const checkout = new Checkout(totalWeight, cartValue);
        
        const shipping = new ExpressShipping();
        checkout.setShippingMethod(shipping);

        const finalTotal = checkout.getTotalCost();
        console.log(`Shipping method: ${checkout.getShippingDetails()}`);
        console.log(`Total price (with shipping): ${finalTotal.format()}`);

    } catch (error) {
        if (error instanceof Error) {
            console.error(`Checkout error: ${error.message}`);
        }
    }
}

main();